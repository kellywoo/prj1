import React, {Component} from 'react';
import {Subject} from 'rxjs';
import {distinctUntilChanged, map, takeUntil, debounceTime, switchMap} from 'rxjs/operators';
import {apiService} from '@app/repository/api.service';
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'

@observer
export default class SearchMobComponent extends Component {
  q$: Subject<string> = new Subject();
  destroy$ = new Subject();
  @observable list: any[] = [];

  @action.bound
  onInput(e: any) {
    this.q$.next(e.target.value)
  }

  componentWillMount() {
    this.q$
      .pipe(
        debounceTime(70),
        distinctUntilChanged((x, y) => x === y),
        switchMap((key: string) => apiService.getQuery(key)),
        map((data: any)=> data.results),
        takeUntil(this.destroy$),
      )
      .subscribe((data) => {
        this.list = data;
      });
  }

  componentWillUnmount() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  render() {
    return (
      <div>
        <div className="ui action left icon input">
          <span className="search icon"/>
          <input type="text" placeholder="Search..." onInput={this.onInput}/>
          <button type="button" className="ui teal button">
            Search
          </button>
        </div>
        <ul>
          {
            this.list.map((item) => {
              return (
                <li key={item.id}>
                  <img src={item.urls.thumb} alt={item.alt_description} />
                </li>)
            })
          }
        </ul>
      </div>
    );
  }
}
