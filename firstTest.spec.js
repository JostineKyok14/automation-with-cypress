/// <reference types="cypress" />

//Test suite to create 'describe' would be the main role test to describe and 'it' would be the steps to do the test
describe ('First test suite', () => {

        it('first test', () =>{
            //put the code of the test

            cy.visit('/') // adding / is because in cypress.config.js the baseUrl: 'http://localhost:4200' if we didn't config then add the url
            cy.contains('Forms').click()
            cy.contains('Form Layouts').click()
            //by Tag name
            cy.get('input')

            //by id
            cy.get('#inputEmail1')

            //by Class value
            cy.get('.input-full-width')

            //by Attribute name
            cy.get('[fullwidth]')

            //by Attribute and value
            cy.get('[placeholder="Email"]')

            //by entire Class value
            cy.get ('[class="input-full-width size-medium shape-rectangle"]')

            //by two attributes
            cy.get('[placeholder="Email"][fullwidth]')

            //by tag, attribute id and class
            cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

            //by cypress
            cy.get('[data-cy="imputEmail1"]')
        })    

        it('Second test', () =>{
            cy.visit('/') // adding / is because in cypress.config.js the baseUrl: 'http://localhost:4200' if we didn't config then add the url
            cy.contains('Forms').click()
            cy.contains('Form Layouts').click()

            //Theory type locators
            // get() - find elements on the page by locator globally
            // find() - find child elements by locator
            // contains ( - find HTML text and by text and locator)

            cy.contains('Sign in')
            cy.contains('[status="warning"]', 'Sign in')
            cy.contains('nb-card', 'Horizontal form').find('button')
            cy.contains('nb-card', 'Horizontal form').contains('Sign in')
            cy.contains('nb-card', 'Horizontal form').get('button')

            //cypress chains and DOM
            cy.get('#inputEmail3')
                .parents('form')
                .find('button')
                .should('contain', 'Sign in')
                .parents('form')
                .find('nb-checkbox')
                .click()
        })    
        
        it.only('save the subject of the command', () =>{
            cy.visit('/') // adding / is because in cypress.config.js the baseUrl: 'http://localhost:4200' if we didn't config then add the url
            cy.contains('Forms').click()
            cy.contains('Form Layouts').click()
            cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
            cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

            //CANT DO THING LIKE THIS
            //const usingTheGrid = cy.contains('nb-card', 'Using the Grid')
            //usingTheGrid.find('[for="inputEmail1"]').should('contain', 'Email')
            //usingTheGrid.find('[for="inputPassword2"]').should('contain', 'Password')

            // 1 Cypress Alias
            cy.contains('nb-card', 'Using the Grid').as('usingTheGrid')
            cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain', 'Email')
            cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain', 'Password')

            // 2 Cypress then() methods
            cy.contains('nb-card', 'Using the Grid').then( usingTheGridForm =>{
                cy.wrap(usingTheGridForm).find('[for="inputEmail1"]').should('contain', 'Email')
                cy.wrap(usingTheGridForm).find('[for="inputPassword2"]').should('contain', 'Password')
            })
        })  

        it('extract text values', () =>{
            cy.visit('/') // adding / is because in cypress.config.js the baseUrl: 'http://localhost:4200' if we didn't config then add the url
            cy.contains('Forms').click()
            cy.contains('Form Layouts').click()
            

            //1
            cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

            //2
            cy.get('[for="exampleInputEmail1"]').then(label => {
                const labelText = label.text()
                expect(labelText).to.equal('Email address')
                cy.wrap(labelText).should('contain', 'Email address')
            })

            //3
            cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
                expect(text).to.equal('Email address')
            })
            cy.get('[for="exampleInputEmail1"]').invoke('text').as('labelText').should('contain', 'Email address') //another variation from 3

            //4
            cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then(classValue=> {
                expect(classValue).to.equal('label')
            })

            //5 invoke properties
            cy.get('#exampleInputEmail1').type('jcharpentiers14@gmail.com')
            cy.get('#exampleInputEmail1').invoke('prop', 'value').should('contain', 'jcharpentiers14@gmail.com').then(property =>{
                expect(property).to.equal('jcharpentiers14@gmail.com')
            })
        })  

        it('RadioButtons', () =>{
            cy.visit('/') // adding / is because in cypress.config.js the baseUrl: 'http://localhost:4200' if we didn't config then add the url
            cy.contains('Forms').click()
            cy.contains('Form Layouts').click()
            cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons =>{
                cy.wraps(radioButtons).eq(0).check({force: true}).should('be.checked')
                cy.wraps(radioButtons).eq(1).check({force: true})
                cy.wraps(radioButtons).eq(0).should('not.be.checked')
                cy.wraps(radioButtons).eq(2).should('be.disabled')
            })
        })    

        it('Checkboxes', () =>{
            cy.visit('/') // adding / is because in cypress.config.js the baseUrl: 'http://localhost:4200' is added. if we didn't config then add the url
            cy.contains('Modal & Overlays').click()
            cy.contains('Toastr').click()

            
            cy.contains('[type="checkbox"]').eq(0).click({force: true})
            cy.contains('[type="checkbox"]').eq(1).check({force: true})
        })   

        it.only('date picker', () =>{
            

            function selectDayFromCurrent(day){
            let date = new Date() //this for letting the date for not updating
            date.setDate(date.getDate() + day)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleDateString('en-US', {month: 'short'})
            let futureYear = date.getFullYear()
            let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`
                cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute =>{
                    if(!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)){
                        cy.get('[data-name="chevron-right"]').click()
                        selectDayFromCurrent(day)
                    } else {
                        cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
                    }
                })
                return dateToAssert
            }
            cy.visit('/') // adding / is because in cypress.config.js the baseUrl: 'http://localhost:4200' is added. if we didn't config then add the url
            cy.contains('Forms').click()
            cy.contains('Datepicker').click()
            cy.contains('nb-card', 'Common Datepicker').find('input').then(input=>{
                cy.wrap(input).click()
                const dateToAssert = selectDayFromCurrent(200)
                cy.wrap(input).invoke('prop', 'value').should('contain', dateToAssert)
                cy.wrap(input).should('have.value', dateToAssert)
            })
        })
})



