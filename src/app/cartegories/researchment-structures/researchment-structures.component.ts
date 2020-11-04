import { Component } from '@angular/core';
import {
  PaginatedSearchComponent,
  FindRequest,
  Page,
  Order,
  Direction,
} from '../../_helpers/search';
import { ResearchmentStructure } from '../../_models/researchmentStructure';
import { ResearchmentStructuresService } from '../../_services/researchment.structures.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

/**
 * Rearchment Structure component
 */
@Component({
  selector: 'app-researchment-structures',
  templateUrl: './researchment-structures.component.html',
  styleUrls: ['./researchment-structures.component.css'],
})
export class ResearchmentStructuresComponent extends PaginatedSearchComponent<
  ResearchmentStructure
> {
  echartOptions: any;

  protected removeInternal(
    entity: ResearchmentStructure
  ): Observable<{} | Response> {
    throw new Error('Method not implemented.');
  }
  constructor(
    router: Router,
    translate: TranslateService,
    toastr: ToastrService,
    private researchmentStructureService: ResearchmentStructuresService
  ) {
    super(router, translate, toastr);
  }

  protected findInternal(
    findRequest: FindRequest
  ): Observable<Page<ResearchmentStructure>> {
    return this.researchmentStructureService.findUsers(findRequest);
  }

  protected getDefaultOrder(): Order {
    return {
      property: 'name',
      direction: Direction.ASC,
    };
  }

  ngOnInit(): void {
    // TODO
    const page = this.researchmentStructureService.findResearchmentStructures(
      null
    );

    this.searchResult = page.content;
    page.uibPage = page.number + 1;
    this.resultObject = page;

    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push('category' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    const data = this.genData(50);

    this.echartOptions = {
      title: {
        text: '同名数量统计',
        subtext: '纯属虚构',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: data.legendData,
        // data: null,

        selected: data.selected,
        // selected: null,
      },
      series: [
        {
          name: '姓名',
          type: 'pie',
          radius: '55%',
          center: ['40%', '50%'],
          data: data.seriesData,
          //data: null,
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
  }

  /**
   *
   * @param count
   */
  genData(count) {
    var nameList = [
      '赵',
      '钱',
      '孙',
      '李',
      '周',
      '吴',
      '郑',
      '王',
      '冯',
      '陈',
      '褚',
      '卫',
      '蒋',
      '沈',
      '韩',
      '杨',
      '朱',
      '秦',
      '尤',
      '许',
      '何',
      '吕',
      '施',
      '张',
      '孔',
      '曹',
      '严',
      '华',
      '金',
      '魏',
      '陶',
      '姜',
      '戚',
      '谢',
      '邹',
      '喻',
      '柏',
      '水',
      '窦',
      '章',
      '云',
      '苏',
      '潘',
      '葛',
      '奚',
      '范',
      '彭',
      '郎',
      '鲁',
      '韦',
      '昌',
      '马',
      '苗',
      '凤',
      '花',
      '方',
      '俞',
      '任',
      '袁',
      '柳',
      '酆',
      '鲍',
      '史',
      '唐',
      '费',
      '廉',
      '岑',
      '薛',
      '雷',
      '贺',
      '倪',
      '汤',
      '滕',
      '殷',
      '罗',
      '毕',
      '郝',
      '邬',
      '安',
      '常',
      '乐',
      '于',
      '时',
      '傅',
      '皮',
      '卞',
      '齐',
      '康',
      '伍',
      '余',
      '元',
      '卜',
      '顾',
      '孟',
      '平',
      '黄',
      '和',
      '穆',
      '萧',
      '尹',
      '姚',
      '邵',
      '湛',
      '汪',
      '祁',
      '毛',
      '禹',
      '狄',
      '米',
      '贝',
      '明',
      '臧',
      '计',
      '伏',
      '成',
      '戴',
      '谈',
      '宋',
      '茅',
      '庞',
      '熊',
      '纪',
      '舒',
      '屈',
      '项',
      '祝',
      '董',
      '梁',
      '杜',
      '阮',
      '蓝',
      '闵',
      '席',
      '季',
      '麻',
      '强',
      '贾',
      '路',
      '娄',
      '危',
    ];
    var legendData = [];
    var seriesData = [];
    var selected = {};
    var name;

    for (var i = 0; i < count; i++) {
      name =
        Math.random() > 0.65
          ? makeWord(4, 1) + '·' + makeWord(3, 0)
          : makeWord(2, 1);
      legendData.push(name);
      seriesData.push({
        name: name,
        value: Math.round(Math.random() * 100000),
      });
      selected[name] = i < 6;
    }

    return {
      legendData: legendData,
      seriesData: seriesData,
      selected: selected,
    };

    function makeWord(max, min) {
      var nameLen = Math.ceil(Math.random() * max + min);
      var name = [];
      for (var i = 0; i < nameLen; i++) {
        name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
      }
      return name.join('');
    }
  }
}
