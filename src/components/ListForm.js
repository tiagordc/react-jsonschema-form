import { createElement } from 'react';
import { render } from 'react-dom';
import { getUIfromSchema, getJSfromSP, getSPfromJS } from '../utils';

import Form from "./Form";
import PnP from "sp-pnp-js";
import PeoplePickerWidget from './widgets/PeopleWidget'

import "babel-polyfill";

export default class ListForm {

  load(domId, schema, list, item) {
    
    let that = this;

    that.elem = document.getElementById(domId);
    that.listName = list;
    that.itemId = item;
    
    let promises = [getUIfromSchema(schema, { "people": PeoplePickerWidget })];
    
    if (typeof list === "string") {
        promises.push(PnP.sp.web.lists.getByTitle(list).fields.get());
        if (typeof item === "number") {
            promises.push(PnP.sp.web.lists.getByTitle(list).items.getById(item).get());
        }
    }

    Promise.all(promises).then(function(data) {
        
        var uiSchema = data[0];

        let formProps = { 
            schema: schema, 
            uiSchema: uiSchema
        };

        if (data.length > 1) {

            that.listFields = data[1];

            if (data.length > 2) {
                that.listItem = data[2];
                formProps.formData = getJSfromSP(that.listItem, that.listFields);
            }

            formProps.onSubmit = (data) => {
                const item = getSPfromJS(data.formData, that.listFields);
                const items = PnP.sp.web.lists.getByTitle(that.listName).items;
                if (that.listItem) items.getById(that.itemId).update(item).then(i => { console.log(i); });             
                else items.add(item).then(i => { console.log(i); });
            };

        }

        render(createElement(Form, formProps, null), that.elem);

    });

  }

  destroy() {

    if (this.elem) {
      while (this.elem.firstChild) {
          this.elem.removeChild(this.elem.firstChild);
      }
    }

    this.elem = null
    this.listName = null;
    this.itemId = null;
    this.listItem = null;
    this.listFields = null;

  }

}