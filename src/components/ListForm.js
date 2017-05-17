import { createElement } from 'react';
import { render } from 'react-dom';
import { getUIfromSchema, getJSfromSP } from '../utils';

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
    
    if (typeof list === "string" && typeof item === "number") {
        let p1 = PnP.sp.web.lists.getByTitle(list).items.getById(item).get();
        let p2 = PnP.sp.web.lists.getByTitle(list).fields.get();
        promises.push(p1, p2);
    }

    Promise.all(promises).then(function(data) {
        
        var uiSchema = data[0];

        let formProps = { 
            schema: schema, 
            uiSchema: uiSchema,
            onChange: that.onChange ? that.onChange : null,
            onError: that.onError ? that.onError : null,
            onSubmit: that.onSave ? that.onSave : null
        };

        // if (data.length > 1) {
        //     var jsObject = getJSfromSP(data[1], data[2]);
        // }

        render(createElement(Form, formProps, null), that.elem);

    });

  }

  save(list, item) {

  }

  destroy() {
    if (this.elem) {
      while (this.elem.firstChild) {
          this.elem.removeChild(this.elem.firstChild);
      }
    }
  }

}