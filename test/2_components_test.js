import React from 'react/addons';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import TodoList from '../src/components/todo_list';
import TodoForm from '../src/components/todo_form'; 
import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} = ReactTestUtils;

describe('Task List',()=>{
  it('renders a list of 3 tasks',()=>{
    const component = renderIntoDocument(
      <TodoList />
    );
    const tasks = scryRenderedDOMComponentsWithTag(component, 'li');

     expect(tasks.length).to.equal(3) 
  })

  describe('Tasks in list',()=>{
    it('Buy Milk',()=>{
      const component = renderIntoDocument(
        <TodoList />
      );
      const tasks = scryRenderedDOMComponentsWithTag(component, 'li');
      const milkTask = tasks.map((task)=> {return task.textContent})
                            .filter((task)=> {return task == 'Buy Milk'})[0]

      expect(milkTask).to.equal('Buy Milk');
    })

    it('Clean Room',()=>{
      const component = renderIntoDocument(
        <TodoList />
      );
      const tasks = scryRenderedDOMComponentsWithTag(component, 'li');
      const milkTask = tasks.map((task)=> {return task.textContent})
                            .filter((task)=> {return task == 'Clean Room'})[0]

      expect(milkTask).to.equal('Clean Room');
    })

    it('Pay Phone Bill',()=>{
      const component = renderIntoDocument(
        <TodoList />
      );
      const tasks = scryRenderedDOMComponentsWithTag(component, 'li');
      const milkTask = tasks.map((task)=> {return task.textContent})
                            .filter((task)=> {return task == 'Pay Phone Bill'})[0]

      expect(milkTask).to.equal('Pay Phone Bill');
    })
  })
})

describe('Todo Form', ()=>{
  it('renders a text input',()=>{
    const component = renderIntoDocument(
      <TodoForm />
    );

    const taskInput = scryRenderedDOMComponentsWithTag(component, 'input');

    expect(taskInput.length).to.equal(1) 
    expect(taskInput[0].type).to.equal('text')
  })
  it('renders an add button',()=>{
    const component = renderIntoDocument(
      <TodoForm />
    )
    const addButton = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(addButton.length).to.equal(1);
    expect(addButton[0].textContent).to.equal('Add')

  })
})