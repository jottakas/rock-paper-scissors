import { Component } from '@angular/core';
import * as d3 from 'd3';
import { filter, withLatestFrom } from 'rxjs';
import { GameService } from '../../../services/game.service';
import { MetricsService } from '../../../services/metrics.service';
import { ComponentWithSubscriptions } from '../../../shared/classes/component-with-subscriptions.class';
import { HandShape } from '../../../shared/interfaces/hand-shape.interface';
import { MatchOutcome } from '../../../shared/interfaces/match-outcome.interface';
import { utils } from '../../../shared/util/utils';

@Component({
  selector: 'app-matches-chart',
  templateUrl: './matches-chart.component.html',
  styles: [
  ]
})
export class MatchesChartComponent extends ComponentWithSubscriptions {
  private matches$ = this.metricsService.selectors.selectMatches;
  private handShapes$ = this.gameService.selectors.selectHandShapes;

  public readonly matchesChartId = 'matches-chart';
  private svg!: d3.Selection<any, unknown, HTMLElement, any>;
  private xAxis!: d3.Selection<any, unknown, HTMLElement, any>;
  private yAxis!: d3.Selection<any, unknown, HTMLElement, any>;

  constructor(private readonly metricsService: MetricsService,
    private readonly gameService: GameService) {
    super();
  }

  protected init(): void {
    this.initChart();

    this.cleanupSubscriptions = [
      this.matches$
        .pipe(
          withLatestFrom(this.handShapes$),
          filter(([matches]) =>
            utils.isArrayNotEmpty(matches)
            && utils.isArrayNotEmpty(matches.flatMap(m => m.rounds))
          )
        )
        .subscribe(this.updateChart)
    ]
  }

  private initChart = () => {
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


    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, width])
      .domain(['Rock', 'Paper', 'Scissors'])
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.xAxis = this.svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    this.xAxis.selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, 1])
      .range([height, 0]);

    // Draw the Y-axis on the DOM
    this.yAxis = this.svg.append("g")
      .call(d3.axisLeft(y));
  }

  private updateChart = ([matches, handShapes]: [MatchOutcome[], HandShape[]]) => {

    const margin = 50;
    const width = 750 - (margin * 2);
    const height = 400 - (margin * 2);

    // Create a map { 1: Rock, 2: Paper, 3: Scissors}
    const handShapeIdToName = handShapes.reduce((map, handShape) => {
      map[handShape.id] = handShape.name;
      return map;
    }, {} as any);

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
    const dataArray: DataRow[] = Object.keys(dataMap).map(handShapeId => ({ x: handShapeIdToName[handShapeId], y: dataMap[handShapeId] }));

    const maxY = Math.max(...dataArray.map(d => d.y));

    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, width])
      .domain(Object.values(handShapeIdToName))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.xAxis.call(d3.axisBottom(x))

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, maxY])
      .range([height, 0]);

    // Draw the Y-axis on the DOM
    this.yAxis
      .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
      .data(dataArray)
      .enter()
      .append("rect")
      .attr("x", (d: DataRow) => x(d.x) as any)
      .attr("y", (d: DataRow) => y(d.y))
      .attr("width", x.bandwidth())
      .attr("height", (d: DataRow) => height - y(d.y))
      .attr("fill", "#17a2b8");
  }
}
