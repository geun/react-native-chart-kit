import Pie from "paths-js/pie";
import React from "react";
import { View, ViewStyle } from "react-native";
import { G, Path, Rect, Svg, Text } from "react-native-svg";

import AbstractChart, { AbstractChartProps } from "./AbstractChart";

export interface PieChartProps extends AbstractChartProps {
  totalValue?: string;
  data: Array<any>;
  width: number;
  height: number;
  accessor: string;
  backgroundColor: string;
  paddingLeft: string;
  center?: Array<number>;
  absolute?: boolean;
  hasLegend?: boolean;
  style?: Partial<ViewStyle>;
}

type PieChartState = {};

class PieChart extends AbstractChart<PieChartProps, PieChartState> {
  render() {
    const {
      style = {},
      backgroundColor,
      absolute = false,
      hasLegend = true
    } = this.props;

    const { borderRadius = 0 } = style;

    const chart = Pie({
      center: this.props.center || [0, 0],
      r: this.props.height / 3.4,
      R: this.props.height / 2.8,
      data: this.props.data,
      accessor: x => {
        return x[this.props.accessor];
      }
    });

    const total = this.props.data.reduce((sum, item) => {
      return sum + item[this.props.accessor];
    }, 0);

    const slices = chart.curves.map((c, i) => {
      let value: string;

      if (absolute) {
        value = c.item[this.props.accessor];
      } else {
        if (total === 0) {
          value = 0 + "%";
        } else {
          value =
            Math.fround((100 / total) * c.item[this.props.accessor]).toFixed(
              2
            ) + "%";
        }
      }

      const positionT = this.props.height * (this.props.data.length * 0.12);

      let paddingTop: number;
      if (this.props.data.length < 5) {
        paddingTop = (5 - this.props.data.length) * 12 - 6;
      } else {
        paddingTop = -6;
      }

      return (
        <G key={Math.random()}>
          <Path d={c.sector.path.print()} fill={c.item.color} />
          {hasLegend ? (
            <Rect
              width="16px"
              height="16px"
              fill={c.item.color}
              rx={4}
              ry={4}
              x={this.props.width / 3.4 - 32}
              y={
                -(this.props.height / 3.4) +
                (positionT / this.props.data.length) * i +
                12 +
                paddingTop
              }
            />
          ) : null}
          {hasLegend ? (
            <Text
              fill={c.item.legendFontColor}
              fontSize={c.item.legendFontSize}
              x={this.props.width / 3.4 - 8}
              y={
                -(this.props.height / 3.4) +
                (positionT / this.props.data.length) * i +
                12 * 2 +
                paddingTop
              }
            >
              {`${c.item.name}   ${value}`}
            </Text>
          ) : null}
        </G>
      );
    });

    return (
      <View
        style={{
          width: this.props.width,
          height: this.props.height,
          padding: 0,
          ...style
        }}
      >
        <Svg width={this.props.width} height={this.props.height}>
          <G>
            {this.renderDefs({
              width: this.props.height,
              height: this.props.height,
              ...this.props.chartConfig
            })}
          </G>
          <Rect
            width="100%"
            height={this.props.height}
            rx={borderRadius}
            ry={borderRadius}
            fill={backgroundColor}
          />
          <G
            x={
              this.props.width / 2 / 2 +
              Number(this.props.paddingLeft ? this.props.paddingLeft : 0)
            }
            y={this.props.height / 2}
          >
            {slices}
          </G>

          {this.props.totalValue && (
            <G
              x={this.props.width / 2 / 2 - this.props.center[0] / 2 - 6}
              y={this.props.height / 2 + 6}
            >
              <Text fill={"#222222"} textAnchor={"middle"} fontSize={12}>
                {this.props.totalValue} 만원
              </Text>
            </G>
          )}
        </Svg>
      </View>
    );
  }
}

export default PieChart;
