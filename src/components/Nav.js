import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { removeAlert } from '../alert';
import {
  undoFlowHistory,
  redoFlowHistory,
  editFlowView,
  editColor,
  editLineWidth,
} from '../util';
import CloseButton from './CloseButton';

const mapStateToProps = (state) => ({
  alerts: state.alert.alerts,
  historyIndex: state.flow.historyIndex,
  history: state.flow.history,
  flowView: state.flow.flowView,
  color: state.flow.color,
  lineWidth: state.flow.lineWidth,
});

class Nav extends Component {
  render() {
    const {
      historyIndex,
      history,
      alerts,
      flowView,
      color,
      lineWidth,
    } = this.props;
    const disableUndo = historyIndex <= 0;
    const disableRedo = historyIndex >= history.length - 1;

    return (
      <div className="nav-controls flexbox align-items-center">
        <div className="flex0" style={{ paddingRight: '12px', display: "flex" }}>
          <select
            className="form-control form0"
            value={flowView}
            onChange={e => editFlowView(e.target.value)}>
            <option value="vp">Velocity Potential</option>
            <option value="stream">Stream Function</option>
            <option value="xVel">X Velocity</option>
            <option value="yVel">Y Velocity</option>
          </select>
          <select
            className="form-control form0"
            value={color}
            onChange={e => editColor(e.target.value)}>
            <option value="blue">Blue (doesn't work yet)</option>
            <option value="red">Red (doesn't work yet)</option>
            <option value="grey">Grey (doesn't work yet)</option>
            <option value="orange">Orange (doesn't work yet)</option>
          </select>
          <input type="number" min="1" max="10" value={lineWidth} onChange={e => editLineWidth(e.target.value)}></input>
        </div>
        <div className="flex1 form0"></div>
        <ReactCSSTransitionGroup
          transitionName="alert-box"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}>
          { alerts.map((alert) => {
            return (
              <div key={alert.id}
                className="alert-box flexbox align-items-center">
                <div style={{ marginRight: '15px' }}>{alert.text}</div>
                { alert.undo &&
                  <div className="undo flex0" onClick={() => {
                    removeAlert(alert.id);
                    undoFlowHistory();
                  }}>UNDO</div>
                }
                <CloseButton className="flex0"
                  onClick={() => {
                    removeAlert(alert.id);
                  }}/>
              </div>
            );
          })}
        </ReactCSSTransitionGroup>
        <button className="blank flex0"
          title="Undo"
          disabled={disableUndo}
          onClick={undoFlowHistory}
          title={disableUndo ? '' : `Undo ${history[historyIndex].name}`}>
          <span className="lnr lnr-undo"></span>
        </button>
        <button className="blank flex0"
          title="Redo"
          disabled={disableRedo}
          onClick={redoFlowHistory}
          title={disableRedo ? '' : `Redo ${history[historyIndex + 1].name}`}>
          <span className="lnr lnr-redo"></span>
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Nav);
