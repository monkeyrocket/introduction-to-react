import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import App from '../src/components/app'; 
import TodoForm from '../src/components/todo_form'; 
import TodoList from '../src/components/todo_list';
import Row from '../src/components/row';
import Column from '../src/components/column';  
import {expect} from 'chai';

const { renderIntoDocument, 
        scryRenderedDOMComponentsWithTag, 
        scryRenderedComponentsWithType, 
        findRenderedDOMComponentWithTag } = ReactTestUtils;

describe('Styles',()=>{
  it('is wrapped in a container',()=>{
    const component = renderIntoDocument(
      <App name={'Kenny Powers'}/>
    );
    const divs = scryRenderedDOMComponentsWithTag(component, 'div');
    

    expect(divs[0].className).to.equal('container') 
  })

  describe('input',()=>{
    it('is wrapped in a form-group',()=>{
      const component = renderIntoDocument(
        <TodoForm />
      );
      const columns  = scryRenderedComponentsWithType(component, Column);
      const divs     = scryRenderedDOMComponentsWithTag(columns[0], 'div');
      

      expect(divs[1].className).to.equal('form-group') 
    })

    it('is styled inputs with form-group',()=>{
      const component = renderIntoDocument(
        <TodoForm />
      );
      const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
      

      expect(inputs[0].className).to.equal('form-control') 
    })    
  })

  describe('button',()=>{
    it('is styled with btn-default',()=>{
      const component = renderIntoDocument(
        <TodoForm />
      );
      const button = scryRenderedDOMComponentsWithTag(component, 'button');
      

      expect(button[0].className).to.equal('btn btn-default') 
    }) 
  })

  describe('Row', ()=>{
    it('is styled with row',()=>{
      const component = renderIntoDocument(
        <App name={'Kenny Powers'}/>
      );
      const rows  = scryRenderedComponentsWithType(component, Row);
      const divs   = scryRenderedDOMComponentsWithTag(rows[0], 'div');

      expect(divs[0].className).to.equal('row') 
    }) 

    it('wraps TodoForm',()=>{
      const component = renderIntoDocument(
        <App name={'Kenny Powers'}/>
      );
      const rows      = scryRenderedComponentsWithType(component, Row);
      const todo_form = scryRenderedComponentsWithType(rows[0], TodoForm);


      expect(todo_form.length).to.equal(1) 
    })

    it('wraps TodoList',()=>{
      const component = renderIntoDocument(
        <App name={'Kenny Powers'}/>
      );
      const rows      = scryRenderedComponentsWithType(component, Row);
      const todo_list = scryRenderedComponentsWithType(rows[1], TodoList);


      expect(todo_list.length).to.equal(1) 
    })
  })

  describe('Columns', ()=>{
    it('Wraps TodoForm input with column size 11',()=>{
      const component = renderIntoDocument(
        <TodoForm />
      );
      const columns  = scryRenderedComponentsWithType(component, Column);
      const col_11   = scryRenderedDOMComponentsWithTag(columns[0], 'div');

      expect(col_11[0].className).to.equal('col-md-11')
    })

    it('Wraps TodoForm button with column size 1',()=>{
      const component = renderIntoDocument(
        <TodoForm />
      );
      const columns  = scryRenderedComponentsWithType(component, Column);
      const col_11   = scryRenderedDOMComponentsWithTag(columns[0], 'div');

      expect(col_11[0].className).to.equal('col-md-11')
    })

    it('Wraps TodoList in a column size 12',()=>{
      const component = renderIntoDocument(
        <App name={'Kenny Powers'}/>
      );
      const columns   = scryRenderedComponentsWithType(component, Column);
      const todoListColumn = columns.map((column)=> {
                                        const todoList = scryRenderedComponentsWithType(column, TodoList)
                                        if(todoList.length === 1){
                                          return {todoList: todoList, column: column};
                                        }
                                        return null;
                                      })
                                      .filter((column)=> {return column !== null})[0]
   
      const col12    = scryRenderedDOMComponentsWithTag(todoListColumn.column, 'div')[0];

      expect(todoListColumn.todoList.length).to.equal(1) 
      expect(col12.className).to.equal('col-md-12')
    })
  })

  describe('TodoList', ()=>{
    it('ul styled with list-group',()=>{
      const tasks = ['Buy new Handson cd', 'Walk the dog', 'Call Mum', 'Pay phone bill']
      const component = renderIntoDocument(
        <TodoList tasks={tasks}/>
      );

      const ul = findRenderedDOMComponentWithTag(component, 'ul')
      expect(ul.className).to.equal('list-group')
    })

    it('li styled with list-group',()=>{
      const tasks = ['Buy new Handson cd', 'Walk the dog', 'Call Mum', 'Pay phone bill']
      const component = renderIntoDocument(
        <TodoList tasks={tasks}/>
      );

      const list_items = scryRenderedDOMComponentsWithTag(component, 'li')

      list_items.forEach((list_item)=>{
        expect(list_item.className).to.equal('list-group-item')     
      })
    })
  })
})