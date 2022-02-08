import React from 'react';
import Results,{GET_TOPICS_QUERY} from '../components/Results';
import TestRenderer from 'react-test-renderer';
import {topics} from '../__mocks__/topics'
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from "react-router-dom";
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
  
}));
it('<Results/> success state',async ()=>{
    const mocksTopic = {
        request: {
            query: GET_TOPICS_QUERY,
            variables: {search:"react stars:>10000"},
        },
        result: {
            data: topics,
        },
    };
    const component = TestRenderer.create(
        <BrowserRouter>
            <MockedProvider mocks={[mocksTopic]} addTypename={false} >
                <Results search={"react"} />
            </MockedProvider>
        </BrowserRouter>
    )
    //test loading
    const loading = component.root.findByProps({'data-testid':'loading'});
    expect( loading.children ).toContain("Loading...");
    //test number of nodes
    await new Promise(resolve => setTimeout(resolve, 2000));
    const edgeTopics = component.root.findAllByProps({'data-testid':'edge-topics'});
    expect( edgeTopics ).toHaveLength(10);
    
})
it('<Results/> error state',async ()=>{
    const mocksTopic = {
        request: {
            query: GET_TOPICS_QUERY,
            variables: {earch:"react stars:>10000"},
        },
        error: new Error('An error occurred'),
    };
    const component = TestRenderer.create(
        <MockedProvider mocks={[mocksTopic]} addTypename={false} >
            <Results search={"react"} />
        </MockedProvider>
    )
    //test error
    await new Promise(resolve => setTimeout(resolve, 2000));
    const error = component.root.findByProps({'data-testid':'error'});
    expect( error.children ).toContain("An error occurred");
    
})