import React, {FC} from 'react';
import SearchMobComponent from '@app/component/views/search/search-mobx/search-mobx.component';
import SearchRxComponent from '@app/component/views/search/search-rx/search-rx.component';

export const SearchComponent:FC= ()=>{
  return (
    <div>
      <SearchMobComponent></SearchMobComponent>
      <SearchRxComponent></SearchRxComponent>
    </div>
  )
}
