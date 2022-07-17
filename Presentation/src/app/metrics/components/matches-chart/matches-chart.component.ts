import { Component } from '@angular/core';
import * as d3 from 'd3';
import { MetricsService } from '../../../services/metrics.service';
import { ComponentWithSubscriptions } from '../../../shared/classes/component-with-subscriptions.class';
import { MatchOutcome } from '../../../shared/interfaces/match-outcome.interface';

@Component({
  selector: 'app-matches-chart',
  templateUrl: './matches-chart.component.html',
  styles: [
  ]
})
export class MatchesChartComponent extends ComponentWithSubscriptions {
  public matches$ = this.metricsService.selectors.selectMatches;

  private svg: any;

  public readonly matchesChartId = 'matches-chart';
  constructor(private readonly metricsService: MetricsService) {
    super();
  }

  protected init(): void {
    this.cleanupSubscriptions = [
      this.matches$.subscribe(this.createChart)
    ]
  }

  private createChart = (matches: MatchOutcome[]) => {
    // set the dimensions and margins of the graph
    const margin = 50;
    const width = 750 - (margin * 2);
    const height = 400 - (margin * 2);

    // append the svg object to the body of the page
    this.svg = d3.select("#" + this.matchesChartId)
      .append("svg")
      .attr("width", width + (margin * 2))
      .attr("height", height + (margin * 2))
      .append("g")
      .attr("transform", "translate(" + margin + "," + margin + ")");

      console.log('...',d3.select('#' + this.matchesChartId).size())
      console.log(this.svg)
    // Parse the Data
    const dataMap: { [key: string]: number } = matches
      .flatMap(m => m.rounds)
      .reduce((data, round) => {
        if (!data[round.cpuShapeId]) {
          data[round.cpuShapeId] = 0;
        }
        data[round.cpuShapeId]++;

        return data;
      }, {} as any);

    type DataRow = { x: string, y: number };
    const dataArray: DataRow[] = Object.keys(dataMap).map(handShape => ({ x: handShape, y: dataMap[handShape] }));

    const maxY = Math.max(...dataArray.map(d => d.y));

    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, width])
      .domain(Object.keys(dataMap))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, maxY])
      .range([height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
      .data(dataArray)
      .enter()
      .append("rect")
      .attr("x", (d: DataRow) => x(d.x))
      .attr("y", (d: DataRow) => y(d.y))
      .attr("width", x.bandwidth())
      .attr("height", (d: DataRow) => height - y(d.y))
      .attr("fill", "#d04a35");
  }

  // private createChart(matches: MatchOutcome[]) {
  //   // set the dimensions and margins of the graph
  //   const margin = { top: 30, right: 30, bottom: 70, left: 60 },
  //     width = 460 - margin.left - margin.right,
  //     height = 400 - margin.top - margin.bottom;

  //   // append the svg object to the body of the page
  //   const svg = d3.select("#" + this.matchesChartId)
  //     .append("svg")
  //     .attr("width", width + margin.left + margin.right)
  //     .attr("height", height + margin.top + margin.bottom)
  //     .append("g")
  //     .attr("transform",
  //       "translate(" + margin.left + "," + margin.top + ")");

  //   // Parse the Data

  //   const dataMap: { [key: string]: number } = matches
  //     .flatMap(m => m.rounds)
  //     .reduce((data, round) => {
  //       if (!data[round.cpuShapeId]) {
  //         data[round.cpuShapeId] = 0;
  //       }
  //       data[round.cpuShapeId]++;

  //       return data;
  //     }, {} as any);

  //   type DataRow = { x: string, y: number };

  //   const dataArray: DataRow[] = Object.keys(dataMap).map(handShape => ({ x: handShape, y: dataMap[handShape] }));
  //   const xDomain = Object.keys(dataMap);

  //   // X axis
  //   const x = d3.scaleBand()
  //     .range([0, width])
  //     .domain(xDomain)
  //     .padding(0.2);
  //   svg.append("g")
  //     .attr("transform", "translate(0," + height + ")")
  //     .call(d3.axisBottom(x))
  //     .selectAll("text")
  //     .attr("transform", "translate(-10,0)rotate(-45)")
  //     .style("text-anchor", "end");

  //   // Add Y axis
  //   const y = d3.scaleLinear()
  //     .domain([0, 13000])
  //     .range([height, 0]);
  //   svg.append("g")
  //     .call(d3.axisLeft(y));

  //   // Bars
  //   svg.selectAll("mybar")
  //     .data(dataArray)
  //     .enter()
  //     .append("rect")
  //     .attr("x", function (d: DataRow) { return x(d.x) as any; })
  //     .attr("y", function (d: DataRow) { return y(d.y); })
  //     .attr("width", x.bandwidth())
  //     .attr("height", function (d: DataRow) { return height - y(d.y); })
  //     .attr("fill", "#69b3a2")
  // }

}
