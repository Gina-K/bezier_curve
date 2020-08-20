'use strict'

const circle1 = document.querySelectorAll("circle")[0];
const circle2 = document.querySelectorAll("circle")[1];
const circle3 = document.querySelectorAll("circle")[2];
const circle4 = document.querySelectorAll("circle")[3]
const curve = document.getElementById("curve");
const feeder1 = document.getElementById("feeder-1");
const feeder2 = document.getElementById("feeder-2");
const wrapper = document.getElementById("wrapper");
let circleBeingDragged;
let curvePoints = {x1: 20, y1: 480, x2: 220, y2: 480, x3: 230, y3: 20, x4: 430, y4: 20};

window.addEventListener("mousedown", mouseDownHandler);

function mouseDownHandler(event) {
  if (event.target instanceof SVGCircleElement) {
    circleBeingDragged = event.target;
    circleBeingDragged.x = circleBeingDragged.getAttribute("cx");
    circleBeingDragged.y = circleBeingDragged.getAttribute("cy");
    circleBeingDragged.clientX = event.clientX;
    circleBeingDragged.clientY = event.clientY;

    wrapper.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("mouseup", mouseUpHandler);
  }
}

function mouseMoveHandler(event) {
  circleBeingDragged.setAttribute("cx", event.clientX - (circleBeingDragged.clientX - circleBeingDragged.x));
  circleBeingDragged.setAttribute("cy", event.clientY - (circleBeingDragged.clientY - circleBeingDragged.y));
  switch (circleBeingDragged) {
    case circle1:
      curvePoints.x1 = circleBeingDragged.getAttribute("cx");
      curvePoints.y1 = circleBeingDragged.getAttribute("cy");
      break;
    case circle2:
      curvePoints.x2 = circleBeingDragged.getAttribute("cx");
      curvePoints.y2 = circleBeingDragged.getAttribute("cy");
      break;
    case circle3:
      curvePoints.x3 = circleBeingDragged.getAttribute("cx");
      curvePoints.y3 = circleBeingDragged.getAttribute("cy");
      break;
    case circle4:
      curvePoints.x4 = circleBeingDragged.getAttribute("cx");
      curvePoints.y4 = circleBeingDragged.getAttribute("cy");
  }
  curve.setAttribute("d", `M${curvePoints.x1} ${curvePoints.y1} C ${curvePoints.x2} ${curvePoints.y2}, ${curvePoints.x3} ${curvePoints.y3}, ${curvePoints.x4} ${curvePoints.y4}`);
  feeder1.setAttribute("d", `M${curvePoints.x1} ${curvePoints.y1} L ${curvePoints.x2} ${curvePoints.y2}`);
  feeder2.setAttribute("d", `M${curvePoints.x3} ${curvePoints.y3} L ${curvePoints.x4} ${curvePoints.y4}`);
}

function mouseUpHandler() {
  wrapper.removeEventListener("mousemove", mouseMoveHandler);
  window.removeEventListener("mouseup", mouseUpHandler);
}