import { test, expect } from '@playwright/test'
import booking from '../../testData/booking.json'
test.describe('API Testing - Basic CRUD', () => {
    let token: string
    test('Get List of Bookings', async ({ request }) => {
        const response = await request.get('/booking')

        expect(response.status()).toBe(200)
        //status, header, body
        const headers = response.headers()
        expect(headers['content-type']).toBe('application/json; charset=utf-8')
        console.log(await response.json())

    })
    test.only('Get booking details', async ({ request }) => {
        const response = await request.get('/booking/787')
        console.log(response.status())
        console.log(response.statusText())
        expect(response.status()).toBe(200)
        console.log(await response.json())
        const respBody = await response.json()
        expect(respBody.firstname).toBe('John')
    })
    test('Get List of tags', async ({ request }) => {
        const response = await request
            .get('https://conduit-realworld-example-app.fly.dev/api/tags')
        expect(response.status()).toBe(200)
        //status, header, body
        const headers = response.headers()
        expect(headers['content-type'])
            .toBe('application/json; charset=utf-8')
        console.log(await response.json())
    })
    test('Create new booking', async ({ request }) => {
        const response = await request
            .post('/booking', {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: booking
            })
        expect(response.status()).toBe(200)
        console.log(await response.json())
        const resBody = await response.json()
        expect(resBody.booking).toHaveProperty('firstname', 'Anandhi')
        expect(resBody.booking.bookingdates)
            .toHaveProperty('checkin', '2025-01-01')

    })
    test('Generate Token', async ({ request }) => {
        const response = await request.post('/auth', {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "username": "admin",
                "password": "password123"
            }
        })
        const resBody = await response.json()
        token = resBody.token
        console.log(token)
    })

    test.only('To update booking', async ({ request }) => {
        const response = await request.post('/auth', {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "username": "admin",
                "password": "password123"
            }
        })
        const resBody = await response.json()
        token = resBody.token
        const responseUpd = await request.put('/booking/787', {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': token
            },
            data: booking
        })
        console.log(responseUpd.status(), ' with Status Text', response.statusText())
        const resBodyUpd = await responseUpd.json()
        console.log('JSON Body....', resBodyUpd)
        // expect(resBodyUpd.status()).toBe(200)
        // expect(resBodyUpd.booking).toHaveProperty('firstname', 'Anandhi')

    })

    test.only('To update book details', async ({ request }) => {
        const responseUpd = await request
            .put('https://bookstore-api-six.vercel.app/api/books/1', {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: { title: 'Playwright API testing' }
            })
        console.log(responseUpd.status(), ' with Status Text',
            responseUpd.statusText())
        const resBodyUpd = await responseUpd.json()
        console.log('JSON Body....', resBodyUpd)
        expect(responseUpd.status()).toBe(200)
        expect(resBodyUpd).toHaveProperty('title', 'Playwright API testing')

    })

    test.only('To delete book details', async ({ request }) => {
        const response = await request
            .delete('https://bookstore-api-six.vercel.app/api/books/5')
        console.log(response.status())
        const respBody = await response.json()
        console.log(respBody)
        expect(respBody).toHaveProperty('id', 5)
        expect(respBody).toHaveProperty('message', 'Book deleted')
    })
})
//https://bookstore-api-six.vercel.app/