/**
 * @jest-environment jsdom
 */

import { UrlManager } from "./UrlManager";

describe('UrlManager Unit Test Suite', () => {
    const testUrl = 'http://test.com/';
    const testParameterName = 'testName';
    const testParameterValue = 'testValue';
    const testParameterObject = {
        name1: 'value',
        name2: 'value'
    }


    describe('constructor() Test Suite', () => {
        it('should create a URL object with the current page URL', () => {
            const urlManagerTest = new UrlManager();
            expect(urlManagerTest.url.href).toBe(window.location.href);
        });

        it('should create a URL object with the specified URL', () => {
            const urlManagerTest = new UrlManager(testUrl);
            expect(urlManagerTest.url.href).toBe(testUrl);
        });

        it('should create a URL with the right parameters', () => {
            const urlManagerTest = new UrlManager(testUrl, testParameterObject);
            const urlSearchParams = urlManagerTest.url.searchParams;

            for (const parameter in testParameterObject) {
                expect(urlSearchParams.has(parameter)).toBeTruthy();
                expect(urlSearchParams.get(parameter)).toBe(testParameterObject[parameter]);
            }
        });
    });


    describe('setUrl() Method Test Suite', () => {
        it('should change the URL of the URL object', () => {
            const urlManagerTest = new UrlManager();
            urlManagerTest.setUrl(testUrl);
            expect(urlManagerTest.url.href).toBe(testUrl);
        });
    });


    describe('addParameter() Method Test Suite', () => {
        it('should add a new parameter to the URL with the right value', () => {
            const urlManagerTest = new UrlManager(testUrl);
            urlManagerTest.addParameter(testParameterName, testParameterValue);
            expect(urlManagerTest.url.searchParams.has(testParameterName)).toBeTruthy();
            expect(urlManagerTest.url.searchParams.get(testParameterName)).toBe(testParameterValue);
        });
    });


    describe('getParameter() Method Test Suite', () => {
        it('should return the value of the parameter', () => {
            const urlManagerTest = new UrlManager(testUrl);
            urlManagerTest.addParameter(testParameterName, testParameterValue);
            const parameterValue = urlManagerTest.getParameter(testParameterName);
            expect(parameterValue).toBe(testParameterValue);
        });


        it('should throw an error if the parameter doesn\'t exist', () => {
            const urlManagerTest = new UrlManager(testUrl);
            expect(() => {
                urlManagerTest.getParameter('test');
            }).toThrow();
        });
    });
});
