import React from "react";
import Device from "./Device";

class DeviceList extends React.Component {
  constructor() {
    super();
    this.state = { sortToggle: true };
    this.sort = this.sort.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  sort(arr, index, direction) {
    let rows, switching, i, shouldSwitch;
    const $table = document.querySelector("table");
    switching = true;
    while (switching) {
      switching = false;
      rows = $table.getElementsByTagName("TR");
      for (i = 1; i < rows.length - 1; i++) {
        shouldSwitch = false;
        let x = rows[i].getElementsByTagName("TD")[index];
        let y = rows[i + 1].getElementsByTagName("TD")[index];
        if (direction === "upper") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (direction === "lower") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }

  handleSort(e) {
    let target;
    if (e.target.parentNode.nodeName === "TH") {
      target = e.target.parentNode;
    } else {
      target = e.target;
    }
    const arr = Array.from(target.parentNode.children);
    const index = arr.indexOf(target);
    if (this.state.sortToggle) {
      this.sort(arr, index, "upper");
      this.setState({ sortToggle: !this.state.sortToggle });
    } else {
      this.sort(arr, index, "lower");
      this.setState({ sortToggle: !this.state.sortToggle });
    }
  }

  render() {
    let deviceNodes = this.props.data.map(device => (
      <Device
        key={device["_id"]}
        uniqueID={device["_id"]}
        onDeviceDelete={this.props.onDeviceDelete}
        onDeviceUpdate={this.props.onDeviceUpdate}
        credential={this.props.credential}
      >
        {device.model}
        {device.system}
        {device.available}
        {device.holder}
      </Device>
    ));
    return (
      <div className="DeviceList">
        <table className="table is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th onClick={this.handleSort}>
                <i className="fa fa-sort" /> <span> Model </span>
              </th>
              <th onClick={this.handleSort}>
                <i className="fa fa-sort" /> <span> System </span>
              </th>
              <th onClick={this.handleSort}>
                <i className="fa fa-sort" /> <span> Dostępność </span>
              </th>
              <th onClick={this.handleSort}>
                <i className="fa fa-sort" /> <span> Posiadacz </span>
              </th>
              {this.props.credential ? (
                <th onClick={this.handleSort}>
                  <i className="fa fa-sort"> </i> <span> Czynności </span>
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>{deviceNodes}</tbody>
        </table>
      </div>
    );
  }
}

export default DeviceList;
