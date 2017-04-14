import React, { Component } from 'react';
import Flow from './Flow';
import { POINT_VORTEX } from '../../constants/flowTypes';
import { getRadius,
         radiusTeX,
         getRadiusSq,
         radiusSqTeX,
         over2Pi,
         over2PiTeX,
         diffTeX,
         fracTeX } from '../../util';

// velocity potential
const vp = (gamma, x0, y0) => {
  return (x, y) => {
    return over2Pi(gamma) * Math.atan2(y - y0, x - x0);
  };
};

const vpTeX = (gamma, x0, y0) => {
  return `${over2PiTeX(gamma)}atan2(${diffTeX('y', y0)}, ${diffTeX('x', x0)})`;
};

const vpTeXEq = vpTeX('\\Gamma', 'x_0', 'y_0');

// stream function
const stream = (gamma, x0, y0) => {
  return (x, y) => {
    return over2Pi(gamma) * Math.log(getRadius(x - x0, y - y0));
  };
};

const streamTeX = (gamma, x0, y0) => {
  return `${over2PiTeX(gamma)}ln(${radiusTeX(x0, y0)})`;
};

const streamTeXEq = streamTeX('\\Gamma', 'x_0', 'y_0');

// x velocity
const xVel = (gamma, x0, y0) => {
  return (x, y) => {
    const xDiff = x - x0;
    const yDiff = y - y0;
    const radiusSq = getRadiusSq(xDiff, yDiff);
    if(radiusSq === 0) {
      return Infinity;
    }

    return over2Pi(gamma) * -yDiff / radiusSq;
  };
};

const xVelTeX = (gamma, x0, y0) => {
  return over2PiTeX(gamma) + fracTeX(`-(${diffTeX('y', y0)})`, radiusSqTeX(x0, y0));
};

const xVelTeXEq = xVelTeX('\\Gamma', 'x_0', 'y_0');

// y velocity
const yVel = (gamma, x0, y0) => {
  return (x, y) => {
    const xDiff = x - x0;
    const yDiff = y - y0;
    const radiusSq = getRadiusSq(xDiff, yDiff);
    if(radiusSq === 0) {
      return Infinity;
    }

    return over2Pi(gamma) * xDiff / radiusSq;
  };
};

const yVelTeX = (gamma, x0, y0) => {
  return over2PiTeX(gamma) + fracTeX(diffTeX('x', x0), radiusSqTeX(x0, y0));
};

const yVelTeXEq = yVelTeX('\\Gamma', 'x_0', 'y_0');

export const makePointVortexFlowFcns = (inputs) => {
  const { gamma, x0, y0 } = inputs;
  return {
    vp: vp(gamma, x0, y0),
    stream: stream(gamma, x0, y0),
    xVel: xVel(gamma, x0, y0),
    yVel: yVel(gamma, x0, y0)
  };
};

export const pointVortexFlowStrs = (inputs) => {
  const { gamma, x0, y0 } = inputs;
  return {
    vp: vpTeX(gamma, x0, y0),
    stream: streamTeX(gamma, x0, y0),
    xVel: xVelTeX(gamma, x0, y0),
    yVel: yVelTeX(gamma, x0, y0)
  };
};

export const pointVortexEqs = {
  vp: vpTeXEq,
  stream: streamTeXEq,
  xVel: xVelTeXEq,
  yVel: yVelTeXEq
};


export default class PointVortex extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <Flow
        {...this.props}
        name="Point Vortex"
        type={POINT_VORTEX}
        makeFlowFcns={makePointVortexFlowFcns}
        makeFlowStrs={pointVortexFlowStrs}
        eqs={pointVortexEqs}/>
    );
  };
};