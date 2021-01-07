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

    static returnDataForTree(treeType: string) {
        if (treeType !== 'area') {
            return {
                name: 'Publicación',
                children: [
                    {
                        name: 'Abstracts',
                        value: 'ABS',
                        selected: false,
                        children: []
                    },
                    {
                        name: 'Publicación académica',
                        value: 'PUA',
                        selected: true,
                        children: [
                            {
                                name: 'Tesis',
                                value: 'TES',
                                selected: false,
                                children: [{ name: 'Tesis de bachiller', value: 'TEB', selected: false, children: [] },
                                { name: 'Tesis de doctoral', value: 'TED', selected: false, children: [] },
                                { name: 'Tesis de master', value: 'TEM', selected: false, children: [] }]
                            },
                            { name: 'Contenido audiovisual', value: 'COV', selected: false, children: [] },
                            { name: 'Catalogo', value: 'CAT', selected: false, children: [] }
                        ]
                    },
                    {
                        name: 'Artículo', value: 'ART', selected: false, children: [
                            { name: 'Artículo Técnico', value: 'ATE', selected: false, children: [] }
                        ]
                    },
                    { name: 'Publicación científica', value: 'PUC', selected: false, children: [] }

                ],
            };
        } else {
            return {
                name: 'Áreas',
                children: [
                    {
                        name: 'Ciencias matemáticas, físicas, químicas e ingenierías',
                        value: 'CMIFQ',
                        selected: true,
                        children: [
                            {
                                name: 'Ciencias y tecnologías quimicas',
                                value: 'CTQ',
                                selected: false,
                                children: [
                                    { name: 'Ingeniería Química', value: 'IQM', selected: false, children: [] },
                                    { name: 'Química', value: 'QMC', selected: false, children: [] }
                                ]
                            },
                            {
                                name: 'Energía y transporte',
                                value: 'EYT',
                                selected: false,
                                children: [
                                    { name: 'Energía', value: 'ENE', selected: false, children: [] },
                                    { name: 'Transporte', value: 'TRA', selected: false, children: [] }
                                ]
                            },
                            {
                                name: 'Ciencias físicas',
                                value: 'FIS',
                                selected: false,
                                children: [
                                    { name: 'Astonomía y astrofísica', value: 'AYA', selected: false, children: [] },
                                    { name: 'Investigación espacial', value: 'ESP', selected: false, children: [] },
                                    { name: 'Física fundamenta y de partículas', value: 'FFP', selected: false, children: [] },
                                    { name: 'Física y sus aplicaciones', value: 'FYA', selected: false, children: [] }
                                ]
                            },
                            {
                                name: 'Ciencias y Tecnologías de materiales',
                                value: 'MAT',
                                selected: false,
                                children: [
                                    { name: 'Materiales para biomedicia', value: 'MBM', selected: false, children: [] },
                                    { name: 'Materiales para la energia y el medioambiente', value: 'MEN', selected: false, children: [] },
                                    { name: 'Materiales estructurales', value: 'MES', selected: false, children: [] },
                                    {
                                        name: 'Materiales con funcionalidad eléctrica, magnética, óptica o térmica',
                                        value: 'FYA', selected: false, children: []
                                    }
                                ]
                            },
                            {
                                name: 'Ciencias matematicas',
                                value: 'MTM',
                                selected: false,
                                children: []
                            }
                        ]
                    },
                    {
                        name: 'Ciencias sociales y humanidades',
                        value: 'CSH',
                        selected: true,
                        children: [
                            {
                                name: 'Ciencias sociales',
                                value: 'CSO',
                                selected: false,
                                children: [
                                    { name: 'Comunicación', value: 'COM', children: [] },
                                    { name: 'Ciencia politica', value: 'CPO', children: [] },
                                    { name: 'Estudios feministas, de las mujeres y de genero', value: 'FEM', children: [] },
                                    { name: 'Geografía', value: 'GEO', children: [] },
                                    { name: 'Sociología y antropología social', value: 'SOC', children: [] },

                                ]
                            },
                            { name: 'Derecho', value: 'DER', selected: false, children: [] },
                            {
                                name: 'Economía', value: 'ECO', selected: false, children: [
                                    { name: 'Economía y sus aplicaciones', value: 'EYA', selected: false, children: [] },
                                    { name: 'Empresas y finanzas', value: 'EYF', selected: false, children: [] },
                                    { name: 'Métodos de análisis ecónomico', value: 'MAE', selected: false, children: [] }
                                ]
                            },
                        ]
                    }

                ],
            };
        }
    }
}
