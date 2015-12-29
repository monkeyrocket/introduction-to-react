import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import TodoForm from '../src/components/todo_form'; 
import App from '../src/components/app';
import {expect} from 'chai';

const { renderIntoDocument, 
        scryRenderedDOMComponentsWithTag, 
        findRenderedDOMComponentWithTag,
        Simulate } = ReactTestUtils;


describe('Events', ()=>{
  describe('Add Button',()=>{
    it('handles click event', ()=>{
      let addTask;
      const handleAddTask = () => addTask = 'success';

      const component = renderIntoDocument(
        <TodoForm onAdd={handleAddTask}/>
      );
      const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
      Simulate.click(buttons[0]);

      expect(addTask).to.equal('success');
    })
  })
  describe('Task Input', ()=>{
    it('handles change event',()=>{
      let description;
      const handleTaskDescription = (value) => description = value

      const component = renderIntoDocument(
        <TodoForm onChange={handleTaskDescription}/>
      );
      const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
      const taskInput = inputs[0]
  
      Simulate.change(taskInput,{target: {value: 'buy milk'}});
      expect(description).to.equal('buy milk')
    })
  })
})

describe('Tasks',()=>{
  it('Creates a new task',()=>{
    const component = renderIntoDocument(
      <App name={'Kenny Powers'}/>
    );

    const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
    const taskInput = inputs[0]
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    const addButton = buttons[0]

    Simulate.change(taskInput,{target: {value: 'buy milk'}});
    Simulate.click(addButton);

    const tasks = scryRenderedDOMComponentsWithTag(component, 'li');

    expect(tasks.length).to.equal(1)
    expect(tasks[0].textContent).to.equal('buy milk')
  })

  it('Won\'t add an empty task',()=>{
    const component = renderIntoDocument(
      <App name={'Kenny Powers'}/>
    );

    const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
    const taskInput = inputs[0]
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    const addButton = buttons[0]

    Simulate.change(taskInput,{target: {value: ''}});
    Simulate.click(addButton);

    const tasks = scryRenderedDOMComponentsWithTag(component, 'li');

    expect(tasks.length).to.equal(0)
  })

  it('Clears the input field when new task is added',()=>{
    const component = renderIntoDocument(
      <App name={'Kenny Powers'}/>
    );

    const input = findRenderedDOMComponentWithTag(component, 'input');
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    const addButton = buttons[0]

    Simulate.change(input,{target: {value: 'buy milk'}});
    expect(input.value).to.equal('buy milk');
    Simulate.click(addButton);

    expect(input.value).to.equal(''); 
        
  })
})