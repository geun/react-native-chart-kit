var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics = function(d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(d, b) {
            d.__proto__ = b;
          }) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  };
import React, { Component } from "react";
import { Defs, Line, LinearGradient, Stop, Text } from "react-native-svg";
var AbstractChart = /** @class */ (function(_super) {
  __extends(AbstractChart, _super);
  function AbstractChart() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.calcScaler = function(data) {
      if (_this.props.fromZero) {
        return (
          Math.max.apply(Math, __spreadArrays(data, [0])) -
            Math.min.apply(Math, __spreadArrays(data, [0])) || 1
        );
      } else {
        return Math.max.apply(Math, data) - Math.min.apply(Math, data) || 1;
      }
    };
    _this.calcBaseHeight = function(data, height) {
      var min = Math.min.apply(Math, data);
      var max = Math.max.apply(Math, data);
      if (min >= 0 && max >= 0) {
        return height;
      } else if (min < 0 && max <= 0) {
        return 0;
      } else if (min < 0 && max > 0) {
        return (height * max) / _this.calcScaler(data);
      }
    };
    _this.calcHeight = function(val, data, height) {
      var max = Math.max.apply(Math, data);
      var min = Math.min.apply(Math, data);
      if (min < 0 && max > 0) {
        return height * (val / _this.calcScaler(data));
      } else if (min >= 0 && max >= 0) {
        return _this.props.fromZero
          ? height * (val / _this.calcScaler(data))
          : height * ((val - min) / _this.calcScaler(data));
      } else if (min < 0 && max <= 0) {
        return _this.props.fromZero
          ? height * (val / _this.calcScaler(data))
          : height * ((val - max) / _this.calcScaler(data));
      }
    };
    _this.renderHorizontalLines = function(config) {
      var count = config.count,
        width = config.width,
        height = config.height,
        paddingTop = config.paddingTop,
        paddingRight = config.paddingRight;
      var basePosition = height - height / 4;
      return __spreadArrays(new Array(count + 1)).map(function(_, i) {
        var y = (basePosition / count) * i + paddingTop;
        return (
          <Line
            key={Math.random()}
            x1={paddingRight}
            y1={y}
            x2={width}
            y2={y}
            {..._this.getPropsForBackgroundLines()}
          />
        );
      });
    };
    _this.renderHorizontalLine = function(config) {
      var width = config.width,
        height = config.height,
        paddingTop = config.paddingTop,
        paddingRight = config.paddingRight;
      return (
        <Line
          key={Math.random()}
          x1={paddingRight}
          y1={height - height / 4 + paddingTop}
          x2={width}
          y2={height - height / 4 + paddingTop}
          {..._this.getPropsForBackgroundLines()}
        />
      );
    };
    _this.renderHorizontalLabels = function(config) {
      var count = config.count,
        data = config.data,
        height = config.height,
        paddingTop = config.paddingTop,
        paddingRight = config.paddingRight,
        _a = config.horizontalLabelRotation,
        horizontalLabelRotation = _a === void 0 ? 0 : _a,
        _b = config.decimalPlaces,
        decimalPlaces = _b === void 0 ? 2 : _b,
        _c = config.formatYLabel,
        formatYLabel =
          _c === void 0
            ? function(yLabel) {
                return yLabel;
              }
            : _c;
      var _d = _this.props,
        _e = _d.yAxisLabel,
        yAxisLabel = _e === void 0 ? "" : _e,
        _f = _d.yAxisSuffix,
        yAxisSuffix = _f === void 0 ? "" : _f,
        _g = _d.yLabelsOffset,
        yLabelsOffset = _g === void 0 ? 12 : _g;
      return new Array(count === 1 ? 1 : count + 1).fill(1).map(function(_, i) {
        var yLabel = String(i * count);
        if (count === 1) {
          yLabel =
            "" +
            yAxisLabel +
            formatYLabel(data[0].toFixed(decimalPlaces)) +
            yAxisSuffix;
        } else {
          var label = _this.props.fromZero
            ? (_this.calcScaler(data) / count) * i +
              Math.min.apply(Math, __spreadArrays(data, [0]))
            : (_this.calcScaler(data) / count) * i + Math.min.apply(Math, data);
          yLabel =
            "" +
            yAxisLabel +
            formatYLabel(label.toFixed(decimalPlaces)) +
            yAxisSuffix;
        }
        var basePosition = height - height / 4;
        var x = paddingRight - yLabelsOffset;
        var y =
          count === 1 && _this.props.fromZero
            ? paddingTop + 4
            : (height * 3) / 4 - (basePosition / count) * i + paddingTop;
        return (
          <Text
            rotation={horizontalLabelRotation}
            origin={x + ", " + y}
            key={Math.random()}
            x={x}
            textAnchor="end"
            y={y}
            {..._this.getPropsForLabels()}
          >
            {yLabel}
          </Text>
        );
      });
    };
    _this.renderVerticalLabels = function(_a) {
      var _b = _a.labels,
        labels = _b === void 0 ? [] : _b,
        width = _a.width,
        height = _a.height,
        paddingRight = _a.paddingRight,
        paddingTop = _a.paddingTop,
        _c = _a.horizontalOffset,
        horizontalOffset = _c === void 0 ? 0 : _c,
        _d = _a.stackedBar,
        stackedBar = _d === void 0 ? false : _d,
        _e = _a.verticalLabelRotation,
        verticalLabelRotation = _e === void 0 ? 0 : _e,
        _f = _a.formatXLabel,
        formatXLabel =
          _f === void 0
            ? function(xLabel) {
                return xLabel;
              }
            : _f;
      var _g = _this.props,
        _h = _g.xAxisLabel,
        xAxisLabel = _h === void 0 ? "" : _h,
        _j = _g.xLabelsOffset,
        xLabelsOffset = _j === void 0 ? 0 : _j,
        _k = _g.hidePointsAtIndex,
        hidePointsAtIndex = _k === void 0 ? [] : _k;
      var fontSize = 12;
      var fac = 1;
      if (stackedBar) {
        fac = 0.71;
      }
      return labels.map(function(label, i) {
        if (hidePointsAtIndex.includes(i)) {
          return null;
        }
        var x =
          (((width - paddingRight) / labels.length) * i +
            paddingRight +
            horizontalOffset) *
          fac;
        var y = (height * 3) / 4 + paddingTop + fontSize * 2 + xLabelsOffset;
        return (
          <Text
            origin={x + ", " + y}
            rotation={verticalLabelRotation}
            key={Math.random()}
            x={x}
            y={y}
            textAnchor={verticalLabelRotation === 0 ? "middle" : "start"}
            {..._this.getPropsForLabels()}
          >
            {"" + formatXLabel(label) + xAxisLabel}
          </Text>
        );
      });
    };
    _this.renderVerticalLines = function(_a) {
      var data = _a.data,
        width = _a.width,
        height = _a.height,
        paddingTop = _a.paddingTop,
        paddingRight = _a.paddingRight;
      var _b = _this.props.yAxisInterval,
        yAxisInterval = _b === void 0 ? 1 : _b;
      return __spreadArrays(
        new Array(Math.ceil(data.length / yAxisInterval))
      ).map(function(_, i) {
        return (
          <Line
            key={Math.random()}
            x1={Math.floor(
              ((width - paddingRight) / (data.length / yAxisInterval)) * i +
                paddingRight
            )}
            y1={0}
            x2={Math.floor(
              ((width - paddingRight) / (data.length / yAxisInterval)) * i +
                paddingRight
            )}
            y2={height - height / 4 + paddingTop}
            {..._this.getPropsForBackgroundLines()}
          />
        );
      });
    };
    _this.renderVerticalLine = function(_a) {
      var height = _a.height,
        paddingTop = _a.paddingTop,
        paddingRight = _a.paddingRight;
      return (
        <Line
          key={Math.random()}
          x1={Math.floor(paddingRight)}
          y1={0}
          x2={Math.floor(paddingRight)}
          y2={height - height / 4 + paddingTop}
          {..._this.getPropsForBackgroundLines()}
        />
      );
    };
    _this.renderDefs = function(config) {
      var width = config.width,
        height = config.height,
        backgroundGradientFrom = config.backgroundGradientFrom,
        backgroundGradientTo = config.backgroundGradientTo,
        useShadowColorFromDataset = config.useShadowColorFromDataset,
        data = config.data;
      var fromOpacity = config.hasOwnProperty("backgroundGradientFromOpacity")
        ? config.backgroundGradientFromOpacity
        : 1.0;
      var toOpacity = config.hasOwnProperty("backgroundGradientToOpacity")
        ? config.backgroundGradientToOpacity
        : 1.0;
      var fillShadowGradient = config.hasOwnProperty("fillShadowGradient")
        ? config.fillShadowGradient
        : _this.props.chartConfig.color(1.0);
      var fillShadowGradientOpacity = config.hasOwnProperty(
        "fillShadowGradientOpacity"
      )
        ? config.fillShadowGradientOpacity
        : 0.1;
      return (
        <Defs>
          <LinearGradient
            id="backgroundGradient"
            x1={0}
            y1={height}
            x2={width}
            y2={0}
            gradientUnits="userSpaceOnUse"
          >
            <Stop
              offset="0"
              stopColor={backgroundGradientFrom}
              stopOpacity={fromOpacity}
            />
            <Stop
              offset="1"
              stopColor={backgroundGradientTo}
              stopOpacity={toOpacity}
            />
          </LinearGradient>
          {useShadowColorFromDataset ? (
            data.map(function(dataset, index) {
              return (
                <LinearGradient
                  id={"fillShadowGradient_" + index}
                  key={"" + index}
                  x1={0}
                  y1={0}
                  x2={0}
                  y2={height}
                  gradientUnits="userSpaceOnUse"
                >
                  <Stop
                    offset="0"
                    stopColor={
                      dataset.color ? dataset.color(1.0) : fillShadowGradient
                    }
                    stopOpacity={fillShadowGradientOpacity}
                  />
                  <Stop
                    offset="1"
                    stopColor={
                      dataset.color
                        ? dataset.color(fillShadowGradientOpacity)
                        : fillShadowGradient
                    }
                    stopOpacity="0"
                  />
                </LinearGradient>
              );
            })
          ) : (
            <LinearGradient
              id="fillShadowGradient"
              x1={0}
              y1={0}
              x2={0}
              y2={height}
              gradientUnits="userSpaceOnUse"
            >
              <Stop
                offset="0"
                stopColor={fillShadowGradient}
                stopOpacity={fillShadowGradientOpacity}
              />
              <Stop offset="1" stopColor={fillShadowGradient} stopOpacity="0" />
            </LinearGradient>
          )}
        </Defs>
      );
    };
    return _this;
  }
  AbstractChart.prototype.getPropsForBackgroundLines = function() {
    var _a = this.props.chartConfig.propsForBackgroundLines,
      propsForBackgroundLines = _a === void 0 ? {} : _a;
    return __assign(
      {
        stroke: this.props.chartConfig.color(0.2),
        strokeDasharray: "5, 10",
        strokeWidth: 1
      },
      propsForBackgroundLines
    );
  };
  AbstractChart.prototype.getPropsForLabels = function() {
    var _a = this.props.chartConfig,
      _b = _a.propsForLabels,
      propsForLabels = _b === void 0 ? {} : _b,
      color = _a.color,
      _c = _a.labelColor,
      labelColor = _c === void 0 ? color : _c;
    return __assign({ fontSize: 12, fill: labelColor(0.8) }, propsForLabels);
  };
  return AbstractChart;
})(Component);
export default AbstractChart;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWJzdHJhY3RDaGFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9BYnN0cmFjdENoYXJ0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxLQUFLLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDekMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQWtDMUU7SUFHVSxpQ0FBbUU7SUFIN0U7UUFBQSxxRUFtWUM7UUEvWEMsZ0JBQVUsR0FBRyxVQUFDLElBQWM7WUFDMUIsSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtnQkFDdkIsT0FBTyxJQUFJLENBQUMsR0FBRyxPQUFSLElBQUksaUJBQVEsSUFBSSxHQUFFLENBQUMsTUFBSSxJQUFJLENBQUMsR0FBRyxPQUFSLElBQUksaUJBQVEsSUFBSSxHQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQzthQUN6RDtpQkFBTTtnQkFDTCxPQUFPLElBQUksQ0FBQyxHQUFHLE9BQVIsSUFBSSxFQUFRLElBQUksSUFBSSxJQUFJLENBQUMsR0FBRyxPQUFSLElBQUksRUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbkQ7UUFDSCxDQUFDLENBQUM7UUFFRixvQkFBYyxHQUFHLFVBQUMsSUFBYyxFQUFFLE1BQWM7WUFDOUMsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsT0FBUixJQUFJLEVBQVEsSUFBSSxDQUFDLENBQUM7WUFDOUIsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsT0FBUixJQUFJLEVBQVEsSUFBSSxDQUFDLENBQUM7WUFDOUIsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUU7Z0JBQ3hCLE9BQU8sTUFBTSxDQUFDO2FBQ2Y7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RXpDO1lBQUEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQ2pFO1VBQUEsRUFBRSxjQUFjLENBQUMsQ0FDbEIsQ0FDSDtNQUFBLEVBQUUsSUFBSSxDQUFDLENBQ1IsQ0FBQztRQUNKLENBQUMsQ0FBQzs7SUFDSixDQUFDO0lBMVZDLGtEQUEwQixHQUExQjtRQUNVLElBQUEsS0FBaUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLHdCQUEzQixFQUE1Qix1QkFBdUIsbUJBQUcsRUFBRSxLQUFBLENBQTRCO1FBQ2hFLGtCQUNFLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQ3pDLGVBQWUsRUFBRSxPQUFPLEVBQ3hCLFdBQVcsRUFBRSxDQUFDLElBQ1gsdUJBQXVCLEVBQzFCO0lBQ0osQ0FBQztJQUVELHlDQUFpQixHQUFqQjtRQUNRLElBQUEsS0FJRixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFIeEIsc0JBQW1CLEVBQW5CLGNBQWMsbUJBQUcsRUFBRSxLQUFBLEVBQ25CLEtBQUssV0FBQSxFQUNMLGtCQUFrQixFQUFsQixVQUFVLG1CQUFHLEtBQUssS0FDTSxDQUFDO1FBQzNCLGtCQUNFLFFBQVEsRUFBRSxFQUFFLEVBQ1osSUFBSSxFQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFDbEIsY0FBYyxFQUNqQjtJQUNKLENBQUM7SUFxVUgsb0JBQUM7QUFBRCxDQUFDLEFBbllELENBR1UsU0FBUyxHQWdZbEI7QUFFRCxlQUFlLGFBQWEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IERlZnMsIExpbmUsIExpbmVhckdyYWRpZW50LCBTdG9wLCBUZXh0IH0gZnJvbSBcInJlYWN0LW5hdGl2ZS1zdmdcIjtcblxuaW1wb3J0IHsgQ2hhcnRDb25maWcsIERhdGFzZXQsIFBhcnRpYWxCeSB9IGZyb20gXCIuL0hlbHBlclR5cGVzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWJzdHJhY3RDaGFydFByb3BzIHtcbiAgZnJvbVplcm8/OiBib29sZWFuO1xuICBjaGFydENvbmZpZz86IEFic3RyYWN0Q2hhcnRDb25maWc7XG4gIHlBeGlzTGFiZWw/OiBzdHJpbmc7XG4gIHlBeGlzU3VmZml4Pzogc3RyaW5nO1xuICB5TGFiZWxzT2Zmc2V0PzogbnVtYmVyO1xuICB5QXhpc0ludGVydmFsPzogbnVtYmVyO1xuICB4QXhpc0xhYmVsPzogc3RyaW5nO1xuICB4TGFiZWxzT2Zmc2V0PzogbnVtYmVyO1xuICBoaWRlUG9pbnRzQXRJbmRleD86IG51bWJlcltdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFic3RyYWN0Q2hhcnRDb25maWcgZXh0ZW5kcyBDaGFydENvbmZpZyB7XG4gIGNvdW50OiBudW1iZXI7XG4gIGRhdGE6IERhdGFzZXRbXTtcbiAgd2lkdGg6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIHBhZGRpbmdUb3A6IG51bWJlcjtcbiAgcGFkZGluZ1JpZ2h0OiBudW1iZXI7XG4gIGhvcml6b250YWxMYWJlbFJvdGF0aW9uPzogbnVtYmVyO1xuICBmb3JtYXRZTGFiZWw/OiAoeUxhYmVsOiBzdHJpbmcpID0+IHN0cmluZztcbiAgbGFiZWxzPzogc3RyaW5nW107XG4gIGhvcml6b250YWxPZmZzZXQ/OiBudW1iZXI7XG4gIHN0YWNrZWRCYXI/OiBib29sZWFuO1xuICB2ZXJ0aWNhbExhYmVsUm90YXRpb24/OiBudW1iZXI7XG4gIGZvcm1hdFhMYWJlbD86ICh4TGFiZWw6IHN0cmluZykgPT4gc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBBYnN0cmFjdENoYXJ0U3RhdGUgPSB7fTtcblxuY2xhc3MgQWJzdHJhY3RDaGFydDxcbiAgSVByb3BzIGV4dGVuZHMgQWJzdHJhY3RDaGFydFByb3BzLFxuICBJU3RhdGUgZXh0ZW5kcyBBYnN0cmFjdENoYXJ0U3RhdGVcbj4gZXh0ZW5kcyBDb21wb25lbnQ8QWJzdHJhY3RDaGFydFByb3BzICYgSVByb3BzLCBBYnN0cmFjdENoYXJ0U3RhdGUgJiBJU3RhdGU+IHtcbiAgY2FsY1NjYWxlciA9IChkYXRhOiBudW1iZXJbXSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmZyb21aZXJvKSB7XG4gICAgICByZXR1cm4gTWF0aC5tYXgoLi4uZGF0YSwgMCkgLSBNYXRoLm1pbiguLi5kYXRhLCAwKSB8fCAxO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTWF0aC5tYXgoLi4uZGF0YSkgLSBNYXRoLm1pbiguLi5kYXRhKSB8fCAxO1xuICAgIH1cbiAgfTtcblxuICBjYWxjQmFzZUhlaWdodCA9IChkYXRhOiBudW1iZXJbXSwgaGVpZ2h0OiBudW1iZXIpID0+IHtcbiAgICBjb25zdCBtaW4gPSBNYXRoLm1pbiguLi5kYXRhKTtcbiAgICBjb25zdCBtYXggPSBNYXRoLm1heCguLi5kYXRhKTtcbiAgICBpZiAobWluID49IDAgJiYgbWF4ID49IDApIHtcbiAgICAgIHJldHVybiBoZWlnaHQ7XG4gICAgfSBlbHNlIGlmIChtaW4gPCAwICYmIG1heCA8PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2UgaWYgKG1pbiA8IDAgJiYgbWF4ID4gMCkge1xuICAgICAgcmV0dXJuIChoZWlnaHQgKiBtYXgpIC8gdGhpcy5jYWxjU2NhbGVyKGRhdGEpO1xuICAgIH1cbiAgfTtcblxuICBjYWxjSGVpZ2h0ID0gKHZhbDogbnVtYmVyLCBkYXRhOiBudW1iZXJbXSwgaGVpZ2h0OiBudW1iZXIpID0+IHtcbiAgICBjb25zdCBtYXggPSBNYXRoLm1heCguLi5kYXRhKTtcbiAgICBjb25zdCBtaW4gPSBNYXRoLm1pbiguLi5kYXRhKTtcblxuICAgIGlmIChtaW4gPCAwICYmIG1heCA+IDApIHtcbiAgICAgIHJldHVybiBoZWlnaHQgKiAodmFsIC8gdGhpcy5jYWxjU2NhbGVyKGRhdGEpKTtcbiAgICB9IGVsc2UgaWYgKG1pbiA+PSAwICYmIG1heCA+PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5mcm9tWmVyb1xuICAgICAgICA/IGhlaWdodCAqICh2YWwgLyB0aGlzLmNhbGNTY2FsZXIoZGF0YSkpXG4gICAgICAgIDogaGVpZ2h0ICogKCh2YWwgLSBtaW4pIC8gdGhpcy5jYWxjU2NhbGVyKGRhdGEpKTtcbiAgICB9IGVsc2UgaWYgKG1pbiA8IDAgJiYgbWF4IDw9IDApIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmZyb21aZXJvXG4gICAgICAgID8gaGVpZ2h0ICogKHZhbCAvIHRoaXMuY2FsY1NjYWxlcihkYXRhKSlcbiAgICAgICAgOiBoZWlnaHQgKiAoKHZhbCAtIG1heCkgLyB0aGlzLmNhbGNTY2FsZXIoZGF0YSkpO1xuICAgIH1cbiAgfTtcblxuICBnZXRQcm9wc0ZvckJhY2tncm91bmRMaW5lcygpIHtcbiAgICBjb25zdCB7IHByb3BzRm9yQmFja2dyb3VuZExpbmVzID0ge30gfSA9IHRoaXMucHJvcHMuY2hhcnRDb25maWc7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0cm9rZTogdGhpcy5wcm9wcy5jaGFydENvbmZpZy5jb2xvcigwLjIpLFxuICAgICAgc3Ryb2tlRGFzaGFycmF5OiBcIjUsIDEwXCIsXG4gICAgICBzdHJva2VXaWR0aDogMSxcbiAgICAgIC4uLnByb3BzRm9yQmFja2dyb3VuZExpbmVzXG4gICAgfTtcbiAgfVxuXG4gIGdldFByb3BzRm9yTGFiZWxzKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHByb3BzRm9yTGFiZWxzID0ge30sXG4gICAgICBjb2xvcixcbiAgICAgIGxhYmVsQ29sb3IgPSBjb2xvclxuICAgIH0gPSB0aGlzLnByb3BzLmNoYXJ0Q29uZmlnO1xuICAgIHJldHVybiB7XG4gICAgICBmb250U2l6ZTogMTIsXG4gICAgICBmaWxsOiBsYWJlbENvbG9yKDAuOCksXG4gICAgICAuLi5wcm9wc0ZvckxhYmVsc1xuICAgIH07XG4gIH1cblxuICByZW5kZXJIb3Jpem9udGFsTGluZXMgPSBjb25maWcgPT4ge1xuICAgIGNvbnN0IHsgY291bnQsIHdpZHRoLCBoZWlnaHQsIHBhZGRpbmdUb3AsIHBhZGRpbmdSaWdodCB9ID0gY29uZmlnO1xuICAgIGNvbnN0IGJhc2VQb3NpdGlvbiA9IGhlaWdodCAtIGhlaWdodCAvIDQ7XG5cbiAgICByZXR1cm4gWy4uLm5ldyBBcnJheShjb3VudCArIDEpXS5tYXAoKF8sIGkpID0+IHtcbiAgICAgIGNvbnN0IHkgPSAoYmFzZVBvc2l0aW9uIC8gY291bnQpICogaSArIHBhZGRpbmdUb3A7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8TGluZVxuICAgICAgICAgIGtleT17TWF0aC5yYW5kb20oKX1cbiAgICAgICAgICB4MT17cGFkZGluZ1JpZ2h0fVxuICAgICAgICAgIHkxPXt5fVxuICAgICAgICAgIHgyPXt3aWR0aH1cbiAgICAgICAgICB5Mj17eX1cbiAgICAgICAgICB7Li4udGhpcy5nZXRQcm9wc0ZvckJhY2tncm91bmRMaW5lcygpfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcblxuICByZW5kZXJIb3Jpem9udGFsTGluZSA9IGNvbmZpZyA9PiB7XG4gICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0LCBwYWRkaW5nVG9wLCBwYWRkaW5nUmlnaHQgfSA9IGNvbmZpZztcbiAgICByZXR1cm4gKFxuICAgICAgPExpbmVcbiAgICAgICAga2V5PXtNYXRoLnJhbmRvbSgpfVxuICAgICAgICB4MT17cGFkZGluZ1JpZ2h0fVxuICAgICAgICB5MT17aGVpZ2h0IC0gaGVpZ2h0IC8gNCArIHBhZGRpbmdUb3B9XG4gICAgICAgIHgyPXt3aWR0aH1cbiAgICAgICAgeTI9e2hlaWdodCAtIGhlaWdodCAvIDQgKyBwYWRkaW5nVG9wfVxuICAgICAgICB7Li4udGhpcy5nZXRQcm9wc0ZvckJhY2tncm91bmRMaW5lcygpfVxuICAgICAgLz5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckhvcml6b250YWxMYWJlbHMgPSAoXG4gICAgY29uZmlnOiBPbWl0PEFic3RyYWN0Q2hhcnRDb25maWcsIFwiZGF0YVwiPiAmIHsgZGF0YTogbnVtYmVyW10gfVxuICApID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBjb3VudCxcbiAgICAgIGRhdGEsXG4gICAgICBoZWlnaHQsXG4gICAgICBwYWRkaW5nVG9wLFxuICAgICAgcGFkZGluZ1JpZ2h0LFxuICAgICAgaG9yaXpvbnRhbExhYmVsUm90YXRpb24gPSAwLFxuICAgICAgZGVjaW1hbFBsYWNlcyA9IDIsXG4gICAgICBmb3JtYXRZTGFiZWwgPSAoeUxhYmVsOiBzdHJpbmcpID0+IHlMYWJlbFxuICAgIH0gPSBjb25maWc7XG5cbiAgICBjb25zdCB7XG4gICAgICB5QXhpc0xhYmVsID0gXCJcIixcbiAgICAgIHlBeGlzU3VmZml4ID0gXCJcIixcbiAgICAgIHlMYWJlbHNPZmZzZXQgPSAxMlxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiBuZXcgQXJyYXkoY291bnQgPT09IDEgPyAxIDogY291bnQgKyAxKS5maWxsKDEpLm1hcCgoXywgaSkgPT4ge1xuICAgICAgbGV0IHlMYWJlbCA9IFN0cmluZyhpICogY291bnQpO1xuXG4gICAgICBpZiAoY291bnQgPT09IDEpIHtcbiAgICAgICAgeUxhYmVsID0gYCR7eUF4aXNMYWJlbH0ke2Zvcm1hdFlMYWJlbChcbiAgICAgICAgICBkYXRhWzBdLnRvRml4ZWQoZGVjaW1hbFBsYWNlcylcbiAgICAgICAgKX0ke3lBeGlzU3VmZml4fWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMucHJvcHMuZnJvbVplcm9cbiAgICAgICAgICA/ICh0aGlzLmNhbGNTY2FsZXIoZGF0YSkgLyBjb3VudCkgKiBpICsgTWF0aC5taW4oLi4uZGF0YSwgMClcbiAgICAgICAgICA6ICh0aGlzLmNhbGNTY2FsZXIoZGF0YSkgLyBjb3VudCkgKiBpICsgTWF0aC5taW4oLi4uZGF0YSk7XG4gICAgICAgIHlMYWJlbCA9IGAke3lBeGlzTGFiZWx9JHtmb3JtYXRZTGFiZWwoXG4gICAgICAgICAgbGFiZWwudG9GaXhlZChkZWNpbWFsUGxhY2VzKVxuICAgICAgICApfSR7eUF4aXNTdWZmaXh9YDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYmFzZVBvc2l0aW9uID0gaGVpZ2h0IC0gaGVpZ2h0IC8gNDtcbiAgICAgIGNvbnN0IHggPSBwYWRkaW5nUmlnaHQgLSB5TGFiZWxzT2Zmc2V0O1xuICAgICAgY29uc3QgeSA9XG4gICAgICAgIGNvdW50ID09PSAxICYmIHRoaXMucHJvcHMuZnJvbVplcm9cbiAgICAgICAgICA/IHBhZGRpbmdUb3AgKyA0XG4gICAgICAgICAgOiAoaGVpZ2h0ICogMykgLyA0IC0gKGJhc2VQb3NpdGlvbiAvIGNvdW50KSAqIGkgKyBwYWRkaW5nVG9wO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFRleHRcbiAgICAgICAgICByb3RhdGlvbj17aG9yaXpvbnRhbExhYmVsUm90YXRpb259XG4gICAgICAgICAgb3JpZ2luPXtgJHt4fSwgJHt5fWB9XG4gICAgICAgICAga2V5PXtNYXRoLnJhbmRvbSgpfVxuICAgICAgICAgIHg9e3h9XG4gICAgICAgICAgdGV4dEFuY2hvcj1cImVuZFwiXG4gICAgICAgICAgeT17eX1cbiAgICAgICAgICB7Li4udGhpcy5nZXRQcm9wc0ZvckxhYmVscygpfVxuICAgICAgICA+XG4gICAgICAgICAge3lMYWJlbH1cbiAgICAgICAgPC9UZXh0PlxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcblxuICByZW5kZXJWZXJ0aWNhbExhYmVscyA9ICh7XG4gICAgbGFiZWxzID0gW10sXG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0LFxuICAgIHBhZGRpbmdSaWdodCxcbiAgICBwYWRkaW5nVG9wLFxuICAgIGhvcml6b250YWxPZmZzZXQgPSAwLFxuICAgIHN0YWNrZWRCYXIgPSBmYWxzZSxcbiAgICB2ZXJ0aWNhbExhYmVsUm90YXRpb24gPSAwLFxuICAgIGZvcm1hdFhMYWJlbCA9IHhMYWJlbCA9PiB4TGFiZWxcbiAgfTogUGljazxcbiAgICBBYnN0cmFjdENoYXJ0Q29uZmlnLFxuICAgIHwgXCJsYWJlbHNcIlxuICAgIHwgXCJ3aWR0aFwiXG4gICAgfCBcImhlaWdodFwiXG4gICAgfCBcInBhZGRpbmdSaWdodFwiXG4gICAgfCBcInBhZGRpbmdUb3BcIlxuICAgIHwgXCJob3Jpem9udGFsT2Zmc2V0XCJcbiAgICB8IFwic3RhY2tlZEJhclwiXG4gICAgfCBcInZlcnRpY2FsTGFiZWxSb3RhdGlvblwiXG4gICAgfCBcImZvcm1hdFhMYWJlbFwiXG4gID4pID0+IHtcbiAgICBjb25zdCB7XG4gICAgICB4QXhpc0xhYmVsID0gXCJcIixcbiAgICAgIHhMYWJlbHNPZmZzZXQgPSAwLFxuICAgICAgaGlkZVBvaW50c0F0SW5kZXggPSBbXVxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgZm9udFNpemUgPSAxMjtcblxuICAgIGxldCBmYWMgPSAxO1xuICAgIGlmIChzdGFja2VkQmFyKSB7XG4gICAgICBmYWMgPSAwLjcxO1xuICAgIH1cblxuICAgIHJldHVybiBsYWJlbHMubWFwKChsYWJlbCwgaSkgPT4ge1xuICAgICAgaWYgKGhpZGVQb2ludHNBdEluZGV4LmluY2x1ZGVzKGkpKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB4ID1cbiAgICAgICAgKCgod2lkdGggLSBwYWRkaW5nUmlnaHQpIC8gbGFiZWxzLmxlbmd0aCkgKiBpICtcbiAgICAgICAgICBwYWRkaW5nUmlnaHQgK1xuICAgICAgICAgIGhvcml6b250YWxPZmZzZXQpICpcbiAgICAgICAgZmFjO1xuXG4gICAgICBjb25zdCB5ID0gKGhlaWdodCAqIDMpIC8gNCArIHBhZGRpbmdUb3AgKyBmb250U2l6ZSAqIDIgKyB4TGFiZWxzT2Zmc2V0O1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8VGV4dFxuICAgICAgICAgIG9yaWdpbj17YCR7eH0sICR7eX1gfVxuICAgICAgICAgIHJvdGF0aW9uPXt2ZXJ0aWNhbExhYmVsUm90YXRpb259XG4gICAgICAgICAga2V5PXtNYXRoLnJhbmRvbSgpfVxuICAgICAgICAgIHg9e3h9XG4gICAgICAgICAgeT17eX1cbiAgICAgICAgICB0ZXh0QW5jaG9yPXt2ZXJ0aWNhbExhYmVsUm90YXRpb24gPT09IDAgPyBcIm1pZGRsZVwiIDogXCJzdGFydFwifVxuICAgICAgICAgIHsuLi50aGlzLmdldFByb3BzRm9yTGFiZWxzKCl9XG4gICAgICAgID5cbiAgICAgICAgICB7YCR7Zm9ybWF0WExhYmVsKGxhYmVsKX0ke3hBeGlzTGFiZWx9YH1cbiAgICAgICAgPC9UZXh0PlxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcblxuICByZW5kZXJWZXJ0aWNhbExpbmVzID0gKHtcbiAgICBkYXRhLFxuICAgIHdpZHRoLFxuICAgIGhlaWdodCxcbiAgICBwYWRkaW5nVG9wLFxuICAgIHBhZGRpbmdSaWdodFxuICB9OiBPbWl0PFxuICAgIFBpY2s8XG4gICAgICBBYnN0cmFjdENoYXJ0Q29uZmlnLFxuICAgICAgXCJkYXRhXCIgfCBcIndpZHRoXCIgfCBcImhlaWdodFwiIHwgXCJwYWRkaW5nUmlnaHRcIiB8IFwicGFkZGluZ1RvcFwiXG4gICAgPixcbiAgICBcImRhdGFcIlxuICA+ICYgeyBkYXRhOiBudW1iZXJbXSB9KSA9PiB7XG4gICAgY29uc3QgeyB5QXhpc0ludGVydmFsID0gMSB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiBbLi4ubmV3IEFycmF5KE1hdGguY2VpbChkYXRhLmxlbmd0aCAvIHlBeGlzSW50ZXJ2YWwpKV0ubWFwKFxuICAgICAgKF8sIGkpID0+IHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8TGluZVxuICAgICAgICAgICAga2V5PXtNYXRoLnJhbmRvbSgpfVxuICAgICAgICAgICAgeDE9e01hdGguZmxvb3IoXG4gICAgICAgICAgICAgICgod2lkdGggLSBwYWRkaW5nUmlnaHQpIC8gKGRhdGEubGVuZ3RoIC8geUF4aXNJbnRlcnZhbCkpICogaSArXG4gICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgeTE9ezB9XG4gICAgICAgICAgICB4Mj17TWF0aC5mbG9vcihcbiAgICAgICAgICAgICAgKCh3aWR0aCAtIHBhZGRpbmdSaWdodCkgLyAoZGF0YS5sZW5ndGggLyB5QXhpc0ludGVydmFsKSkgKiBpICtcbiAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHRcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB5Mj17aGVpZ2h0IC0gaGVpZ2h0IC8gNCArIHBhZGRpbmdUb3B9XG4gICAgICAgICAgICB7Li4udGhpcy5nZXRQcm9wc0ZvckJhY2tncm91bmRMaW5lcygpfVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJWZXJ0aWNhbExpbmUgPSAoe1xuICAgIGhlaWdodCxcbiAgICBwYWRkaW5nVG9wLFxuICAgIHBhZGRpbmdSaWdodFxuICB9OiBQaWNrPEFic3RyYWN0Q2hhcnRDb25maWcsIFwiaGVpZ2h0XCIgfCBcInBhZGRpbmdSaWdodFwiIHwgXCJwYWRkaW5nVG9wXCI+KSA9PiAoXG4gICAgPExpbmVcbiAgICAgIGtleT17TWF0aC5yYW5kb20oKX1cbiAgICAgIHgxPXtNYXRoLmZsb29yKHBhZGRpbmdSaWdodCl9XG4gICAgICB5MT17MH1cbiAgICAgIHgyPXtNYXRoLmZsb29yKHBhZGRpbmdSaWdodCl9XG4gICAgICB5Mj17aGVpZ2h0IC0gaGVpZ2h0IC8gNCArIHBhZGRpbmdUb3B9XG4gICAgICB7Li4udGhpcy5nZXRQcm9wc0ZvckJhY2tncm91bmRMaW5lcygpfVxuICAgIC8+XG4gICk7XG5cbiAgcmVuZGVyRGVmcyA9IChcbiAgICBjb25maWc6IFBpY2s8XG4gICAgICBQYXJ0aWFsQnk8XG4gICAgICAgIEFic3RyYWN0Q2hhcnRDb25maWcsXG4gICAgICAgIHwgXCJiYWNrZ3JvdW5kR3JhZGllbnRGcm9tT3BhY2l0eVwiXG4gICAgICAgIHwgXCJiYWNrZ3JvdW5kR3JhZGllbnRUb09wYWNpdHlcIlxuICAgICAgICB8IFwiZmlsbFNoYWRvd0dyYWRpZW50XCJcbiAgICAgICAgfCBcImZpbGxTaGFkb3dHcmFkaWVudE9wYWNpdHlcIlxuICAgICAgPixcbiAgICAgIHwgXCJ3aWR0aFwiXG4gICAgICB8IFwiaGVpZ2h0XCJcbiAgICAgIHwgXCJiYWNrZ3JvdW5kR3JhZGllbnRGcm9tXCJcbiAgICAgIHwgXCJiYWNrZ3JvdW5kR3JhZGllbnRUb1wiXG4gICAgICB8IFwidXNlU2hhZG93Q29sb3JGcm9tRGF0YXNldFwiXG4gICAgICB8IFwiZGF0YVwiXG4gICAgICB8IFwiYmFja2dyb3VuZEdyYWRpZW50RnJvbU9wYWNpdHlcIlxuICAgICAgfCBcImJhY2tncm91bmRHcmFkaWVudFRvT3BhY2l0eVwiXG4gICAgICB8IFwiZmlsbFNoYWRvd0dyYWRpZW50XCJcbiAgICAgIHwgXCJmaWxsU2hhZG93R3JhZGllbnRPcGFjaXR5XCJcbiAgICA+XG4gICkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgICAgYmFja2dyb3VuZEdyYWRpZW50RnJvbSxcbiAgICAgIGJhY2tncm91bmRHcmFkaWVudFRvLFxuICAgICAgdXNlU2hhZG93Q29sb3JGcm9tRGF0YXNldCxcbiAgICAgIGRhdGFcbiAgICB9ID0gY29uZmlnO1xuXG4gICAgY29uc3QgZnJvbU9wYWNpdHkgPSBjb25maWcuaGFzT3duUHJvcGVydHkoXCJiYWNrZ3JvdW5kR3JhZGllbnRGcm9tT3BhY2l0eVwiKVxuICAgICAgPyBjb25maWcuYmFja2dyb3VuZEdyYWRpZW50RnJvbU9wYWNpdHlcbiAgICAgIDogMS4wO1xuICAgIGNvbnN0IHRvT3BhY2l0eSA9IGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShcImJhY2tncm91bmRHcmFkaWVudFRvT3BhY2l0eVwiKVxuICAgICAgPyBjb25maWcuYmFja2dyb3VuZEdyYWRpZW50VG9PcGFjaXR5XG4gICAgICA6IDEuMDtcblxuICAgIGNvbnN0IGZpbGxTaGFkb3dHcmFkaWVudCA9IGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShcImZpbGxTaGFkb3dHcmFkaWVudFwiKVxuICAgICAgPyBjb25maWcuZmlsbFNoYWRvd0dyYWRpZW50XG4gICAgICA6IHRoaXMucHJvcHMuY2hhcnRDb25maWcuY29sb3IoMS4wKTtcblxuICAgIGNvbnN0IGZpbGxTaGFkb3dHcmFkaWVudE9wYWNpdHkgPSBjb25maWcuaGFzT3duUHJvcGVydHkoXG4gICAgICBcImZpbGxTaGFkb3dHcmFkaWVudE9wYWNpdHlcIlxuICAgIClcbiAgICAgID8gY29uZmlnLmZpbGxTaGFkb3dHcmFkaWVudE9wYWNpdHlcbiAgICAgIDogMC4xO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxEZWZzPlxuICAgICAgICA8TGluZWFyR3JhZGllbnRcbiAgICAgICAgICBpZD1cImJhY2tncm91bmRHcmFkaWVudFwiXG4gICAgICAgICAgeDE9ezB9XG4gICAgICAgICAgeTE9e2hlaWdodH1cbiAgICAgICAgICB4Mj17d2lkdGh9XG4gICAgICAgICAgeTI9ezB9XG4gICAgICAgICAgZ3JhZGllbnRVbml0cz1cInVzZXJTcGFjZU9uVXNlXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxTdG9wXG4gICAgICAgICAgICBvZmZzZXQ9XCIwXCJcbiAgICAgICAgICAgIHN0b3BDb2xvcj17YmFja2dyb3VuZEdyYWRpZW50RnJvbX1cbiAgICAgICAgICAgIHN0b3BPcGFjaXR5PXtmcm9tT3BhY2l0eX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxTdG9wXG4gICAgICAgICAgICBvZmZzZXQ9XCIxXCJcbiAgICAgICAgICAgIHN0b3BDb2xvcj17YmFja2dyb3VuZEdyYWRpZW50VG99XG4gICAgICAgICAgICBzdG9wT3BhY2l0eT17dG9PcGFjaXR5fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvTGluZWFyR3JhZGllbnQ+XG4gICAgICAgIHt1c2VTaGFkb3dDb2xvckZyb21EYXRhc2V0ID8gKFxuICAgICAgICAgIGRhdGEubWFwKChkYXRhc2V0LCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgPExpbmVhckdyYWRpZW50XG4gICAgICAgICAgICAgIGlkPXtgZmlsbFNoYWRvd0dyYWRpZW50XyR7aW5kZXh9YH1cbiAgICAgICAgICAgICAga2V5PXtgJHtpbmRleH1gfVxuICAgICAgICAgICAgICB4MT17MH1cbiAgICAgICAgICAgICAgeTE9ezB9XG4gICAgICAgICAgICAgIHgyPXswfVxuICAgICAgICAgICAgICB5Mj17aGVpZ2h0fVxuICAgICAgICAgICAgICBncmFkaWVudFVuaXRzPVwidXNlclNwYWNlT25Vc2VcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8U3RvcFxuICAgICAgICAgICAgICAgIG9mZnNldD1cIjBcIlxuICAgICAgICAgICAgICAgIHN0b3BDb2xvcj17XG4gICAgICAgICAgICAgICAgICBkYXRhc2V0LmNvbG9yID8gZGF0YXNldC5jb2xvcigxLjApIDogZmlsbFNoYWRvd0dyYWRpZW50XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0b3BPcGFjaXR5PXtmaWxsU2hhZG93R3JhZGllbnRPcGFjaXR5fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8U3RvcFxuICAgICAgICAgICAgICAgIG9mZnNldD1cIjFcIlxuICAgICAgICAgICAgICAgIHN0b3BDb2xvcj17XG4gICAgICAgICAgICAgICAgICBkYXRhc2V0LmNvbG9yXG4gICAgICAgICAgICAgICAgICAgID8gZGF0YXNldC5jb2xvcihmaWxsU2hhZG93R3JhZGllbnRPcGFjaXR5KVxuICAgICAgICAgICAgICAgICAgICA6IGZpbGxTaGFkb3dHcmFkaWVudFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdG9wT3BhY2l0eT1cIjBcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9MaW5lYXJHcmFkaWVudD5cbiAgICAgICAgICApKVxuICAgICAgICApIDogKFxuICAgICAgICAgIDxMaW5lYXJHcmFkaWVudFxuICAgICAgICAgICAgaWQ9XCJmaWxsU2hhZG93R3JhZGllbnRcIlxuICAgICAgICAgICAgeDE9ezB9XG4gICAgICAgICAgICB5MT17MH1cbiAgICAgICAgICAgIHgyPXswfVxuICAgICAgICAgICAgeTI9e2hlaWdodH1cbiAgICAgICAgICAgIGdyYWRpZW50VW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFN0b3BcbiAgICAgICAgICAgICAgb2Zmc2V0PVwiMFwiXG4gICAgICAgICAgICAgIHN0b3BDb2xvcj17ZmlsbFNoYWRvd0dyYWRpZW50fVxuICAgICAgICAgICAgICBzdG9wT3BhY2l0eT17ZmlsbFNoYWRvd0dyYWRpZW50T3BhY2l0eX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8U3RvcCBvZmZzZXQ9XCIxXCIgc3RvcENvbG9yPXtmaWxsU2hhZG93R3JhZGllbnR9IHN0b3BPcGFjaXR5PVwiMFwiIC8+XG4gICAgICAgICAgPC9MaW5lYXJHcmFkaWVudD5cbiAgICAgICAgKX1cbiAgICAgIDwvRGVmcz5cbiAgICApO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBBYnN0cmFjdENoYXJ0O1xuIl19
