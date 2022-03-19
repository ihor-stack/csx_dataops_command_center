/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import { HiddenMetric, NamespaceConfig } from '@defs/metrics';

const LSK_HIDDEN_METRICS = 'hiddenMetrrics';
const LSK_NAMESPACE_MENU_CONF = 'metricsMenuConf';
const LSK_ACTIVE_NAMESPACE = 'activeNamespace';

@Injectable()
export class SettingsStorageService {
  getHiddenMetrics(): HiddenMetric[] {
    try {
      const strData = localStorage.getItem(LSK_HIDDEN_METRICS);
      if (strData) {
        return JSON.parse(strData);
      }
    } catch (err) {
      //
    }

    return [];
  }

  saveHiddenMetrics(hiddenMetrics: HiddenMetric[]) {
    localStorage.setItem(
      LSK_HIDDEN_METRICS,
      JSON.stringify(hiddenMetrics)
    );
  }

  getNamespaceMenuConfig(): NamespaceConfig[] {
    try {
      const strData = localStorage.getItem(LSK_NAMESPACE_MENU_CONF);
      if (strData) {
        return JSON.parse(strData);
      }
    } catch (err) {
      //
    }

    return [];
  }

  saveNamespaceMenuConfig(data: NamespaceConfig[]) {
    localStorage.setItem(
      LSK_NAMESPACE_MENU_CONF,
      JSON.stringify(data)
    );
  }

  getActiveNamespace(): string {
    return localStorage.getItem(LSK_ACTIVE_NAMESPACE) || '';
  }

  setActiveNamespace(ns: string) {
    localStorage.setItem(LSK_ACTIVE_NAMESPACE, ns);
  }
}
