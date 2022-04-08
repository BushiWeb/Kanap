/**
 * @jest-environment jsdom
 */

import { UrlManager } from '../../js/routing/UrlManager';

describe('UrlManager Unit Test Suite', () => {
    const testUrl = 'http://test.com/';
    const testParameterName = 'testName';
    const testParameterValue = 'testValue';
    const testParameterObject = {
        name1: 'value',
        name2: 'value',
    };

    const urlSearchParamsAppendMock = jest.spyOn(URLSearchParams.prototype, 'append');
    const urlSearchParamsGetMock = jest.spyOn(URLSearchParams.prototype, 'get');
    const urlSearchParamsHasMock = jest.spyOn(URLSearchParams.prototype, 'has');
    const urlHrefMock = jest.spyOn(URL.prototype, 'href', 'set');

    beforeEach(() => {
        urlSearchParamsAppendMock.mockReset();
        urlSearchParamsGetMock.mockReset();
        urlSearchParamsHasMock.mockReset();
        urlHrefMock.mockReset();
    });

    describe('constructor() Test Suite', () => {
        const urlConstructorMock = jest.spyOn(global, 'URL');
        const urlManagerAddParameter = jest.spyOn(UrlManager.prototype, 'addParameter');

        beforeEach(() => {
            urlConstructorMock.mockReset();
            urlManagerAddParameter.mockReset();
        });

        afterAll(() => {
            urlConstructorMock.mockRestore();
            urlManagerAddParameter.mockRestore();
        });

        it("should call the URL constructor with the current page's URL", () => {
            const urlManagerTest = new UrlManager();
            expect(urlConstructorMock).toHaveBeenCalled();
            expect(urlConstructorMock).toHaveBeenCalledWith(window.location.href);
        });

        it('should call the URL constructor with the specified URL', () => {
            const urlManagerTest = new UrlManager(testUrl);
            expect(urlConstructorMock).toHaveBeenCalled();
            expect(urlConstructorMock).toHaveBeenCalledWith(testUrl);
        });

        it('should create a URL with the right parameters', () => {
            const urlManagerTest = new UrlManager(testUrl, testParameterObject);
            expect(urlManagerAddParameter).toHaveBeenCalledTimes(Object.keys(testParameterObject).length);
        });
    });

    describe('setUrl() Method Test Suite', () => {
        it('should call the URL.href setter', () => {
            const urlManagerTest = new UrlManager();
            urlManagerTest.setUrl(testUrl);
            expect(urlHrefMock).toHaveBeenCalled();
            expect(urlHrefMock).toHaveBeenCalledWith(testUrl);
        });
    });

    describe('addParameter() Method Test Suite', () => {
        it('should call the URL.serachParams.append() method with the right parameters', () => {
            const urlManagerTest = new UrlManager(testUrl);
            urlManagerTest.addParameter(testParameterName, testParameterValue);
            expect(urlSearchParamsAppendMock).toHaveBeenCalled();
            expect(urlSearchParamsAppendMock).toHaveBeenCalledWith(testParameterName, testParameterValue);
        });

        it('should add the parameter to UrlManager.parameters', () => {
            const urlManagerTest = new UrlManager(testUrl);
            urlManagerTest.addParameter(testParameterName, testParameterValue);
            expect(urlManagerTest.parameters[testParameterName]).toBeDefined();
        });
    });

    describe('getParameter() Method Test Suite', () => {
        it('should return the value of the parameter if the parameter is in the manager', () => {
            const urlManagerTest = new UrlManager(testUrl);
            urlManagerTest.parameters[testParameterName] = testParameterValue;
            const parameterValue = urlManagerTest.getParameter(testParameterName);
            expect(parameterValue).toBe(testParameterValue);
        });

        it('should return the value of the parameter if the parameter is not in the manager but exists', () => {
            const urlManagerTest = new UrlManager(testUrl);
            urlSearchParamsGetMock.mockReturnValue(testParameterValue);
            urlSearchParamsHasMock.mockReturnValue(true);
            const parameterValue = urlManagerTest.getParameter(testParameterName);
            expect(parameterValue).toBe(testParameterValue);
        });

        it('should save the value of the parameter if the parameter is not in the manager but exists', () => {
            const urlManagerTest = new UrlManager(testUrl);
            urlSearchParamsGetMock.mockReturnValue(testParameterValue);
            urlSearchParamsHasMock.mockReturnValue(true);
            const parameterValue = urlManagerTest.getParameter(testParameterName);
            expect(urlManagerTest.parameters[testParameterName]).toBeDefined();
        });

        it("should throw an error if the parameter doesn't exist", () => {
            const urlManagerTest = new UrlManager(testUrl);
            urlSearchParamsHasMock.mockReturnValue(false);
            expect(() => {
                urlManagerTest.getParameter('test');
            }).toThrow();
        });
    });
});
