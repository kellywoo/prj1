import React, {Component, createRef, RefObject} from 'react';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import {EasingFunctions} from '@app/util/easing';
import {RAF} from '@app/util/raf';
import AnimateComponent from '@app/component/uis/animation.component';

@observer
export default class MainRewardsComponent extends Component {

  state = {
    rewards: [
      {title: '2018 구글 플레이스토어 올해의 앱 최우수상 수상', img: require('@image/' + 'play-store@2x.png')},
      {title: '2018 애플 앱스토어 오늘의 여행업 선정', img: require('@image/' + 'app-store@2x.png')},
    ],
    records: [
      {source: '%% 명의 사용자', num: 3500000},
      {source: '%% 개의 리뷰', num: 210000},
      {source: '%% 개의 저장', num: 6500000}
    ]
  };

  animateNum = 3;
  animateTimer:any[] = [];
  animateTime = [0, 100, 200];
  easing = EasingFunctions.easeOutQuad;
  countRefs:RefObject<HTMLLIElement>[] = [];

  @observable startAnimation = false;
  @observable ready:boolean[] = Array.from(Array(this.animateNum), () => false);
  @observable records:string[];

  formatNumber(origin: number, value: number) {
    let suf = '';
    if((origin/1e8) >= 1) {
      value = Math.floor(value/1e8);
      suf = '억';
    } else if((origin/1e4) >= 1) {
      value = Math.floor(value/1e4);
      suf = '만';
    } else {
      value = Math.floor(value);
    }

    return value+suf;
  }

  constructor(props: any) {
    super(props);
    this.records = this.countingFrame(0);
  }

  componentDidMount(): void {
    this.showAnimation();
  }

  getRefs(i:number) {
    if(!this.countRefs[i]) {
      this.countRefs[i] = createRef()
    }
    return this.countRefs[i];
  }

  showAnimation(){
    let delay = 0;
    for (let i = 0; i < this.animateNum; i++) {
      if (this.animateTimer[i]) {
        clearTimeout(this.animateTimer[i]);
      }
      this.animateTimer[i] = setTimeout(()=>{
        this.showPannel(i, true);
        if(i === 1) {
          this.startCount();
        }
      }, delay += this.animateTime[i]);
    }
  }

  countingFrame(n: number){
    n = +n.toFixed(3);
    return this.state.records.map((record)=>{
      return record.source.replace('%%', `<strong>${this.formatNumber(record.num, record.num * n)}</strong>`)
    })
  }

  // Todo might need later 확인 필요
  // hideAnimation(){
  //   for (let i = 0; i < this.animateNum; i++) {
  //     if (this.animateTimer[i]) {
  //       clearTimeout(this.animateTimer[i]);
  //     }
  //     this.showPannel(i, false);
  //   }
  // }

  startCount(){
    const start = Date.now();
    const duration = 1000;
    const end = start + duration;
    const handler = () => {
      const now = Date.now();
      if (now > end) {
        this.records = this.countingFrame(1);
      } else {
        const rate = +((now-start)/duration).toFixed(3);
        this.records = this.countingFrame(this.easing(rate));
        RAF(handler);
      }
    };
    RAF(handler);
  }

  @action
  showPannel(i: number, isReady:boolean){
    const ready = [...this.ready];
    ready.splice(i,1, isReady);
    this.ready = ready;
  }
  render(){
    return (
      <div className="app-gutter achieve-section">
        <AnimateComponent show={this.ready[0]}>
          <div className="achieve-left">
            2019년 2월 기준
          </div>
        </AnimateComponent>
        <div className="achieve-right">
          <div className="achieve-index">
            <AnimateComponent show={this.ready[1]}>
              <ul className="list">
                {this.records.map((record, i) => {
                  const ref = this.getRefs(i)
                  return <li dangerouslySetInnerHTML={{__html: record}}
                             ref={ref}
                             key={i} />
                })}
              </ul>
            </AnimateComponent>
          </div>
          <div className="achieve-award">
            <AnimateComponent show={this.ready[2]}>
              <ul className="list">
                {this.state.rewards.map((reward, i) => {
                  return (
                    <li key={i} style={{backgroundImage: `url(${reward.img}`}}>
                      {reward.title}
                    </li>)
                })
                }
              </ul>
            </AnimateComponent>
          </div>
        </div>
      </div>
    )
  }
}
