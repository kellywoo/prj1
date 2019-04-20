import React, {Component} from 'react';

interface IProp {
  values: string[];
  onSelect: (s: string) => void;
}

const s = {
  selection: '',
  num: 0
};
export class SelectComponent extends Component<IProp> {
  readonly state = s;

  constructor(props: IProp) {
    super(props);
    this.state.selection = props.values[3];
  }

  onClick() {
    this.setState((state: any) => ({num: ++state.num}));
    console.log(this.state.num,  s === this.state);
    this.setState((state: any) => ({num: ++state.num}));
    console.log(this.state.num);
    this.setState((state: any) => ({num: ++state.num}));
    console.log(this.state.num);
  }

  render() {
    return (
      <div>
        <button onClick={this.onClick.bind(this)}>click {this.state.num}</button>
        <ul onKeyDown={this.onKeyDown} tabIndex={0}>
          {this.props.values.map(value =>
            <li
              style={value === this.state.selection ? {color: 'red'} : {}}
              key={value}
              onClick={() => this.onSelect(value)}
            >
              {value}
            </li>
          )}
        </ul>
      </div>
    )
  }

  onSelect(value: string) {
    this.setState({
      selection: value
    });
    this.fireOnSelect()
  }

  onKeyDown = (e: any) => {
    const {values} = this.props;
    const idx = values.indexOf(this.state.selection);
    if (e.keyCode === 38 && idx > 0) { /* up */
      this.setState({
        selection: values[idx - 1]
      })
    } else if (e.keyCode === 40 && idx < values.length - 1) { /* down */
      this.setState({
        selection: values[idx + 1]
      })
    }
    this.fireOnSelect()
  }

  fireOnSelect() {
    if (typeof this.props.onSelect === "function")
      this.props.onSelect(this.state.selection) /* not what you expected..*/
  }
}
