import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { utils } from '../util/utils';

@Component({ template: '' })
export abstract class ComponentWithSubscriptions implements OnInit, OnDestroy {

  protected cleanupSubscriptions: Subscription[] = [];

  public ngOnInit(): void {
    this.init();
  }

  public ngOnDestroy(): void {
    utils.unsubscribe(this.cleanupSubscriptions);
  }

  protected abstract init(): void;
}