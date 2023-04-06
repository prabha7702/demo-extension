import { BaseApplicationCustomizer, PlaceholderContent, PlaceholderName } from "@microsoft/sp-application-base";
// import * as React from "react";
// import Title from "./components/Title";
// import { Log } from "@microsoft/sp-core-library";
// import * as ReactDOM from 'react-dom'
import styles from './HelloworldApplicationCustomizer.module.scss';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IHelloWorldApplicationCustomizerProperties {
  // This is an example; replace with your own property
  appBarElement: string;
  titleElement:string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class HelloWorldApplicationCustomizer
  extends BaseApplicationCustomizer<IHelloWorldApplicationCustomizerProperties> {
  private topPlaceholder: PlaceholderContent | undefined;
  private bottomPlaceholder: PlaceholderContent | undefined;
  public onInit(): Promise<void> {
    if (this.properties.appBarElement !== "") {
      const appBarEle:any = document.getElementById(this.properties.appBarElement);
      appBarEle.style = "display:none";
    }
    // if(this.properties.titleElement!==""){
    //   const titleEle = document.getElementsByClassName(this.properties.titleElement)[0];
    //   titleEle.innerHTML="TECHNOVERT";
    // }
    this.context.placeholderProvider.changedEvent.add(this,this.renderPlaceholders);
  
    return Promise.resolve();
  }
  private renderPlaceholders(): void {
    //get topPlaceholder
    if (!this.topPlaceholder) {
      // tring to get topPlaceholder
      this.topPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top, { onDispose: this.onPlaceholderDispose })
    }
    //check if topPlaceholder is available to you
    if (this.topPlaceholder) {
      if (this.topPlaceholder.domElement) {
        this.topPlaceholder.domElement.innerHTML = `
          <div class="${styles.app}"}>
          <div class="${styles.top}">
           TECHNOVERT
           </div>
          </div>`
      }
    }
    else {
      //could not get top placeholder
      alert("Could not get top placeholder");
      return;

    }
    //get bottom placeholder
    if (!this.bottomPlaceholder) {
      // try to get bottom placeholder
      this.bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Bottom, { onDispose: this.onPlaceholderDispose });
    }
    if (this.bottomPlaceholder) {
      if (this.bottomPlaceholder.domElement) {
        this.bottomPlaceholder.domElement.innerHTML = `
        <div class="${styles.app}">
        <div class="${styles.bottom}">
        Technovert
        </div>
        </div>
        `
      }
    }
    else {
      alert("could not load bottom placeholder");
      return;
    }
  }
  private onPlaceholderDispose():void {
    alert("Placeholder disposed");
  }
}