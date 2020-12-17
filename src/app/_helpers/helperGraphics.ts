import { SeriesBarData } from "../_models/seriesBarData";

/**
 *
 *  clase de ayuda para la configuración de graficos y utilidades de los mismos.
 * @export
 * @class HelperGraphics
 */
export class HelperGraphics {

    /**
     * Configuración general de chart
     *
     * @param {*} data
     * @param {string} seriesName
     * @param {string} typeChart
     * @param {string} titleText
     * @return {*} 
     * @memberof HelperGraphics
     */
    static configChartPie(data: any, seriesName: string, titleText: string) {
        const echartOptions = {
            title: {
                text: titleText,
                left: 'center',
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)',
            },
            legend: {
                type: 'scroll',
                orient: 'horizontal',
                right: 10,
                top: 30,
                bottom: 0,
                data: data.legendData,
                selected: data.selected,
            },
            series: [
                {
                    name: seriesName,
                    type: 'pie',
                    radius: '55%',
                    center: ['40%', '50%'],
                    data: data.seriesData,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    },
                },
            ],
        };
        return echartOptions;
    }

    static configChartBar(xAxisData: any, seriesData: Array<SeriesBarData>, legendData: Array<string>) {
        const echartOptions = {
            legend: {
                data: legendData,
                align: 'left',
            },
            tooltip: {},
            xAxis: {
                data: xAxisData,
                silent: false,
                splitLine: {
                    show: false,
                },
            },
            yAxis: {},
            series: seriesData,
            animationEasing: 'elasticOut',
            animationDelayUpdate: (idx) => idx * 5,
        };
        return echartOptions;
    }

    static configChartTree(dataTree: Array<any>) {
        const echartOptions = {
            series: [{
                type: 'treemap',
                data: dataTree,
                label: {
                    show: true
                },
                tooltip: {
                    borderWidth: 0.5
                }
            }]
        };
        return echartOptions;
    }
}
