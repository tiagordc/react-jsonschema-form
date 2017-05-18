import { createElement } from 'react';
import { render } from 'react-dom';
import { getUIfromSchema, getSchemaFromList, getJSfromSP, getSPfromJS } from '../utils';

import Form from "./Form";
import PnP from "sp-pnp-js";

import "babel-polyfill";

export default class ListForm {

  load (element, listName, itemId) {
    
    let that = this;

    that.listName = listName;
    that.itemId = itemId;
    that.elem = element;

    PnP.sp.web.lists.getByTitle(listName).fields.get().then(function(fields) {
        
        that.listFields = fields; 

        getSchemaFromList(fields).then(function (schema) {

            let promises = [getUIfromSchema(schema)];

            if (typeof itemId === "number" && itemId > 0) {
                promises.push(PnP.sp.web.lists.getByTitle(listName).items.getById(itemId).get());
            }

            Promise.all(promises).then(function(data) {
        
                var uiSchema = data[0];

                let formProps = { 
                    schema: schema, 
                    uiSchema: uiSchema
                };

                if (data.length > 1) {

                    that.listItem = data[1];
                    let item = getJSfromSP(that.listItem, that.listFields);
                    let eventDetails = { item: item, source: that.listItem, fields: that.listFields };
                    let proceed = that.elem.dispatchEvent(new CustomEvent('loading', { 'detail': eventDetails }));

                    if (proceed) {
                        formProps.formData = item;
                        that.elem.dispatchEvent(new CustomEvent('loaded', { 'detail': eventDetails }));
                    }

                }

                formProps.onSubmit = (data) => {

                    let item = getSPfromJS(data.formData, that.listFields);
                    let eventDetails = { item: item, source: data.formData, errors: data.errors };
                    let proceed = that.elem.dispatchEvent(new CustomEvent('saving', { 'detail': eventDetails }));

                    if (proceed) {
                        const items = PnP.sp.web.lists.getByTitle(that.listName).items;
                        if (that.listItem) items.getById(that.itemId).update(item);             
                        else items.add(item);
                        that.elem.dispatchEvent(new CustomEvent('saved', { 'detail': eventDetails }));
                    }
                    
                };

                render(createElement(Form, formProps, null), that.elem);

            });

        });

    });

  }

  loadWithSchema (element, schema, listName, itemId) {
    
    let that = this;

    that.listName = listName;
    that.itemId = itemId;
    that.elem = element;

    let promises = [getUIfromSchema(schema)];
    
    if (typeof listName === "string") {
        promises.push(PnP.sp.web.lists.getByTitle(listName).fields.get());
        if (typeof itemId === "number" && itemId > 0) {
            promises.push(PnP.sp.web.lists.getByTitle(listName).items.getById(itemId).get());
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
                let item = getJSfromSP(that.listItem, that.listFields);
                let eventDetails = { item: item, source: that.listItem, fields: that.listFields };
                let proceed = that.elem.dispatchEvent(new CustomEvent('loading', { 'detail': eventDetails }));

                if (proceed) {
                    formProps.formData = item;
                    that.elem.dispatchEvent(new CustomEvent('loaded', { 'detail': eventDetails }));
                }

            }

            formProps.onSubmit = (data) => {

                let item = getSPfromJS(data.formData, that.listFields);
                let eventDetails = { item: item, source: data.formData, errors: data.errors };
                let proceed = that.elem.dispatchEvent(new CustomEvent('saving', { 'detail': eventDetails }));

                if (proceed) {
                    const items = PnP.sp.web.lists.getByTitle(that.listName).items;
                    if (that.listItem) items.getById(that.itemId).update(item);             
                    else items.add(item);
                    that.elem.dispatchEvent(new CustomEvent('saved', { 'detail': eventDetails }));
                }
                
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