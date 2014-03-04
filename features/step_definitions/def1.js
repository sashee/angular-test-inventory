var protractor = require("protractor");
var webdriver = require("selenium-webdriver")
var chai=require("chai")
var chaiAsPromised=require("chai-as-promised")

var request = require('request');

chai.use(chaiAsPromised);
var expect = chai.expect;

var driver = new webdriver.Builder().
    usingServer('http://localhost:4444/wd/hub').
    withCapabilities(webdriver.Capabilities.chrome()).
    build();

driver.manage().timeouts().setScriptTimeout(100000);

browser = protractor.wrapDriver(driver)

var googleSteps = function () {
    var Given= this.defineStep;
    var When=this.defineStep;
    var Then=this.defineStep;
    var Before=this.defineStep;

    this.Before(function (callback) {
        request.post({
            url: 'http://localhost:3000/rest/resetdb'
        }, function(error, response, body){
            callback();
        });

        var disableNgAnimate = function() {
            angular.module('disableNgAnimate', []).run(function($animate) {
                $animate.enabled(false);
            });
        };

        browser.addMockModule('disableNgAnimate', disableNgAnimate);
    });

    this.Given(/^I am on the main page$/, function(callback) {
        browser.get('http://localhost:3000').then(callback);
    });

    this.Then(/^I should see "([^"]*)" in the place "([^"]*)"$/, function(arg1, arg2, callback) {
        browser.findElements(protractor.By.xpath("//*[contains(@class,'place')]/*[contains(@class,'name') and contains(.,'"+arg2+"')]/../*[not(contains(@class,'ng-hide')) and not(contains(@class,'name')) and contains(.,'"+arg1+"')]")).then(function(res){
            if(res.length){
                callback();
            }else{
                throw new Error();
            }
        });
    });

    this.Then(/^I shouldn't see "([^"]*)" in any place$/, function(arg1, callback) {
        browser.findElements(protractor.By.xpath("//*[contains(@class,'place')]/*[not(contains(@class,'ng-hide')) and not(contains(@class,'name')) and contains(.,'"+arg1+"')]")).then(function(res){
            if(res.length){
                throw new Error();
            }else{
                callback();
            }
        });
    });

    this.When(/^I click on the Organize button next to Places$/, function(callback) {
        browser.findElements(protractor.By.xpath("//*[contains(text(),'Organize')]")).then(function(res){
            res[0].click().then(callback);
        });
    });

    this.Then(/^The heading should be "([^"]*)"$/, function(arg1, callback) {
        browser.findElements(protractor.By.css(".page-title .text")).then(function(res){
            expect(res[0].getText()).to.eventually.equal(arg1).and.notify(callback);
        });
    });

    this.Then(/^I should see "([^"]*)"$/, function(arg1, callback) {
        browser.findElements(protractor.By.xpath("//body//*[contains(translate(text(), '"+arg1.toUpperCase()+"', '"+arg1.toLowerCase()+"'),'"+arg1.toLowerCase()+"')]")).then(function(res){
            if(res.length){
                callback();
            }else{
                throw new Error();
            }
        });
    });

    this.Then(/^I should see the "([^"]*)" place$/, function(arg1, callback) {
        browser.findElements(protractor.By.xpath("//*[contains(@class,'place-editor-header')]/*[contains(@class,'text') and text()='"+arg1+"']")).then(function(res){
            if(res.length){
                callback();
            }else{
                throw new Error();
            }
        });
    });

    this.Given(/^I am on the places page$/, function(callback) {
        browser.get('http://localhost:3000').then(function(){
            browser.findElements(protractor.By.xpath("//*[contains(text(),'Organize')]")).then(function(res){
                res[0].click().then(callback);
            });
        });
    });

    this.When(/^I click on the add place header$/, function(callback) {
        browser.findElements(protractor.By.css(".place-creator .place-editor-header")).then(function(res){
            res[0].click().then(callback);
        });
    });

    this.When(/^I write "([^"]*)" as the name$/, function(arg1, callback) {
        browser.findElements(protractor.By.xpath("//*[contains(concat(' ',@class,' '),' place-editor ') and not(contains(@class,'ng-hide'))]//label[contains(text(),'Name')]/../input")).then(function(res){
            res[0].clear().then(function(){res[0].sendKeys(arg1).then(callback)})
        });
    });

    this.When(/^I write "([^"]*)" as the description$/, function(arg1, callback) {
        browser.findElements(protractor.By.xpath("//*[contains(concat(' ',@class,' '),' place-editor ') and not(contains(@class,'ng-hide'))]//label[contains(text(),'Description')]/../input")).then(function(res){
            res[0].clear().then(function(){res[0].sendKeys(arg1).then(callback)})
        });
    });

    this.Then(/^I should see "([^"]*)" as the name$/, function(arg1, callback) {
        browser.findElements(protractor.By.xpath("//*[contains(concat(' ',@class,' '),' place-editor ') and not(contains(@class,'ng-hide'))]//label[contains(text(),'Name')]/../input")).then(function(res){
            expect(res[0].getAttribute('value')).to.eventually.equal(arg1).and.notify(callback);
        });
    });

    this.When(/^I click on the "([^"]*)" place header$/, function(arg1, callback) {
        browser.findElements(protractor.By.xpath("//*[contains(@class,'place-editor-header')]//*[contains(@class,'text') and text()='"+arg1+"']/..")).then(function(res){
            res[0].click().then(callback);
        });
    });

    this.Then(/^I shouldn't see the "([^"]*)" place$/, function(arg1, callback) {
        browser.findElements(protractor.By.xpath("//*[contains(@class,'place-editor-header')]/*[contains(@class,'text') and text()='"+arg1+"']")).then(function(res){
            if(res.length){
                throw new Error();
            }else{
                callback();
            }
        });
    });

    this.When(/^I click on the History button on "([^"]*)" header$/, function(arg1, callback) {
        browser.findElements(protractor.By.xpath("//*[contains(@class,'place-editor-header')]//*[contains(@class,'text') and text()='"+arg1+"']/../a")).then(function(res){
            res[0].click().then(callback);
        });
    });

    this.Then(/^I should see "([^"]*)" as the description$/, function(arg1, callback) {
        browser.findElements(protractor.By.xpath("//*[contains(concat(' ',@class,' '),' place-editor ') and not(contains(@class,'ng-hide'))]//label[contains(text(),'Description')]/../input")).then(function(res){
            expect(res[0].getAttribute('value')).to.eventually.equal(arg1).and.notify(callback);
        });
    });



    this.Then(/^I should see stuff "([^"]*)"$/, function(arg1, callback) {
        browser.findElements(protractor.By.xpath("//*[contains(@class,'stuff-panel')]//*[contains(@class,'stuff') and contains(.,'"+arg1+"')]")).then(function(res){
            if(res.length){
                callback();
            }else{
                throw new Error();
            }
        });

    });


    this.When(/^I click on the back arrow$/, function(callback) {
        browser.findElements(protractor.By.xpath("//*[contains(@class,'page-title')]//*[contains(@class,'icon-')]")).then(function(res){
            res[0].click().then(callback);
        });
    });

    this.When(/^I click on the Organize button next to Stuffs$/, function(callback) {
        browser.findElements(protractor.By.xpath("//*[contains(text(),'Organize')]")).then(function(res){
            res[1].click().then(callback);
        });
    });

    this.Then(/^I should see the "([^"]*)" stuff$/, function(arg1, callback) {
        browser.findElements(protractor.By.xpath("//*[contains(@class,'stuff-editor')]//*[contains(@class,'name-text') and contains(.,'"+arg1+"')]")).then(function(res){
            if(res.length){
                callback();
            }else{
                throw new Error();
            }
        });
    });

    this.Given(/^I am on the stuffs page$/, function(callback) {
        browser.get('http://localhost:3000').then(function(){
            browser.findElements(protractor.By.xpath("//*[contains(text(),'Organize')]")).then(function(res){
                res[1].click().then(callback);
            });
        });
    });

    this.When(/^I click on the "([^"]*)" button$/, function(arg1, callback) {
        browser.findElements(protractor.By.xpath("//body//*[not(ancestor-or-self::*[contains(@class,'ng-hide') or contains(@class,'hidden')]) and translate(text(),'"+arg1.toUpperCase()+"','"+arg1.toLowerCase()+"')='"+arg1.toLowerCase()+"' and not(@disabled)]")).then(function(res){
            //res[0].getOuterHtml().then(function(html){console.log(html)});
            res[0].click().then(callback);
        });
    });

    this.When(/^I write "([^"]*)" as the stuff name$/, function(arg1, callback) {
        browser.findElements(protractor.By.css(".stuff-creator-panel input")).then(function(res){
            res[0].clear().then(function(){res[0].sendKeys(arg1).then(callback)})
        });
    });

    this.Then(/^I shouldn't see the "([^"]*)" stuff$/, function(arg1, callback) {
        browser.findElements(protractor.By.xpath("//*[contains(@class,'stuff-editor')]//*[contains(@class,'name-text') and contains(.,'"+arg1+"')]")).then(function(res){
            if(res.length){
                throw new Error();
            }else{
                callback();
            }
        });
    });

    this.Then(/^The stuff name input should be empty$/, function(callback) {
        browser.findElements(protractor.By.css(".stuff-creator-panel input")).then(function(res){
            expect(res[0].getText()).to.eventually.equal('').and.notify(callback);
        });
    });

    this.When(/^I click on the "([^"]*)" button next to the "([^"]*)" stuff$/, function(arg1, arg2, callback) {
        browser.findElements(protractor.By.xpath("//*[contains(@class,'stuff-editor')]//*[contains(@class,'name-text') and contains(.,'"+arg2+"')]/..//*[translate(text(),'"+arg1.toUpperCase()+"','"+arg1.toLowerCase()+"')='"+arg1.toLowerCase()+"']")).then(function(res){
            res[0].click().then(callback);
        });
    });

    this.When(/^I write "([^"]*)" as the name for the stuff$/, function(arg1, callback) {
        browser.findElements(protractor.By.xpath("//*[contains(@class,'form-field')]//*[contains(@class,'text') and contains(text(),'Name')]/..//*[contains(@class,'value')]")).then(function(res){
            res[0].clear().then(function(){res[0].sendKeys(arg1).then(callback)})
        });
    });

    this.Then(/^The stuff's name should be "([^"]*)"$/, function(arg1, callback) {
        browser.findElements(protractor.By.xpath("//*[contains(@class,'form-field')]//*[contains(@class,'text') and contains(text(),'Name')]/..//*[contains(@class,'value')]")).then(function(res){
            expect(res[0].getText()).to.eventually.equal(arg1).and.notify(callback);
        });
    });

    this.When(/^I write "([^"]*)" as the description for the stuff$/, function(arg1, callback) {
        browser.findElements(protractor.By.xpath("//*[contains(@class,'form-field')]//*[contains(@class,'text') and contains(text(),'Description')]/..//*[contains(@class,'value')]")).then(function(res){
            res[0].clear().then(function(){res[0].sendKeys(arg1).then(callback)})
        });
    });

    this.Then(/^The stuff's description should be "([^"]*)"$/, function(arg1, callback) {
        browser.findElements(protractor.By.xpath("//*[contains(@class,'form-field')]//*[contains(@class,'text') and contains(text(),'Description')]/..//*[contains(@class,'value')]")).then(function(res){
            expect(res[0].getText()).to.eventually.equal(arg1).and.notify(callback);
        });
    });

    this.Then(/^I should see image "([^"]*)" for stuff "([^"]*)"$/, function(imagenum, arg2, callback) {
        setTimeout(function(){
            browser.waitForAngular().then(function(){
                browser.findElements(protractor.By.xpath("//*[contains(@class,'pictures-carousel')]//ul/..")).then(function(res){
                    browser.executeScript('return arguments[0].getBoundingClientRect().left',res[0]).then(function(ul_left){
                        browser.executeScript('return arguments[0].getBoundingClientRect().right',res[0]).then(function(ul_right){
                            browser.findElements(protractor.By.css(".pictures-carousel li")).then(function(lis){
                                browser.executeScript('return arguments[0].getBoundingClientRect().left',lis[imagenum]).then(function(li_left){
                                    browser.executeScript('return arguments[0].getBoundingClientRect().right',lis[imagenum]).then(function(li_right){
                                        if(li_left>=ul_left && li_right<=ul_right){
                                            browser.executeScript("return arguments[0].style['background-image']",lis[imagenum]).then(function(background_image){
                                                if (background_image.split('(')[1].split(')')[0].split('/rest/stuff/')[1].split('/')[0]===arg2 && background_image.split('(')[1].split(')')[0].split('/rest/stuff/')[1].split('/')[2]===imagenum){
                                                    callback();
                                                }else{
                                                    callback.fail();
                                                }
                                            });
                                        }else{
                                            callback.fail();
                                        }
                                    })
                                });
                            });
                        });
                    });
                })
            })
        },500);
    });

    this.Then(/^I shouldn't see the previous image arrow$/, function(callback) {
        browser.findElements(protractor.By.xpath("//*[contains(@class,'pictures-carousel')]//a[following::ul and not(contains(@class,'hidden'))]")).then(function(res){
            if(res.length){
                throw new Error();
            }else{
                callback();
            }
        });
    });

    this.Then(/^I should see the next image arrow$/, function(callback) {
        browser.findElements(protractor.By.xpath("//*[contains(@class,'pictures-carousel')]//a[preceding::ul and not(contains(@class,'hidden'))]")).then(function(res){
            if(res.length){
                callback();

            }else{
                throw new Error();
            }
        });
    });

    this.When(/^I click on the next image arrow$/, function(callback) {
        browser.findElements(protractor.By.xpath("//*[contains(@class,'pictures-carousel')]//a[preceding::ul and not(contains(@class,'hidden'))]")).then(function(res){
            res[0].click().then(callback);
        });
    });

    this.Then(/^I should see the previous image arrow$/, function(callback) {
        browser.findElements(protractor.By.xpath("//*[contains(@class,'pictures-carousel')]//a[following::ul and not(contains(@class,'hidden'))]")).then(function(res){
            if(res.length){
                callback();

            }else{
                throw new Error();
            }
        });
    });

    this.Then(/^I shouldn't see the next image arrow$/, function(callback) {
        browser.findElements(protractor.By.xpath("//*[contains(@class,'pictures-carousel')]//a[preceding::ul and not(contains(@class,'hidden'))]")).then(function(res){
            if(res.length){
                throw new Error();
            }else{
                callback();
            }
        });
    });

    this.When(/^I click on the previous image arrow$/, function(callback) {
        browser.findElements(protractor.By.xpath("//*[contains(@class,'pictures-carousel')]//a[following::ul and not(contains(@class,'hidden'))]")).then(function(res){
            res[0].click().then(callback);
        });
    });

    this.Then(/^I should see that "([^"]*)" is at "([^"]*)"$/, function(arg1, arg2, callback) {
        browser.findElements(protractor.By.xpath("//*[contains(@class,'stuff-editor')]//*[contains(@class,'name-text') and contains(.,'"+arg1+"')]/../*[contains(@class,'place') and contains(.,'"+arg2+"')]")).then(function(res){
            if(res.length){
                callback();
            }else{
                throw new Error();
            }
        });
    });

    this.When(/^I click on the place next to "([^"]*)"$/, function(arg1, callback) {
        browser.findElements(protractor.By.xpath("//*[contains(@class,'stuff-editor')]//*[contains(@class,'name-text') and contains(.,'"+arg1+"')]/../*[contains(@class,'place')]")).then(function(res){
            res[0].click().then(callback);
        });
    });

    this.When(/^I select "([^"]*)"$/, function(arg1, callback) {
        browser.findElements(protractor.By.xpath("//*[contains(@class,'select2-container')]")).then(function(res){
            res[0].click().then(function(){browser.findElements(protractor.By.xpath("//*[contains(@class,'select2-drop')]//*[contains(@class,'select2-results')]/li[contains(.,'"+arg1+"')]")).then(function(res){
                res[0].click().then(callback);
            });
        });
        })
    });

    this.When(/^I click on the History button on "([^"]*)" stuff header$/, function(arg1, callback) {
        browser.findElements(protractor.By.xpath("//*[contains(@class,'stuff-editor')]//*[contains(@class,'name-text') and contains(.,'"+arg1+"')]/../*[contains(text(),'History')]")).then(function(res){
            res[0].click().then(callback);
        });

    });


}

module.exports = googleSteps;