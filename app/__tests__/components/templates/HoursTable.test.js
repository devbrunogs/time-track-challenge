import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import HoursTable from '../../../src/components/templates/HoursTable';

import hoursRest from '../../../src/rest/hours'

function setupFetchStub(data) {
    return function fetchStub(_url) {
        return new Promise((resolve) => {
            resolve({
                json: () =>
                    Promise.resolve(data)
            })
        })
    }
}

let getMonthDataSpy, updateMonthDataSpy, newMonthDataSpy, setMonthDataSpy, row

function setup(extraParams = {}) {
    setMonthDataSpy = jest.fn()

    updateMonthDataSpy = jest.spyOn(hoursRest, 'updateMonthData')
    newMonthDataSpy = jest.spyOn(hoursRest, 'setNewMonthTable')
    getMonthDataSpy = jest.spyOn(hoursRest, 'getCurrentMonthData')

    return render(
        <HoursTable
            currentMonthData={extraParams.currentMonthData || {}}
            userInfo={{
                id: 1
            }}
            setMonthData={setMonthDataSpy}
        />
    )
}

describe('Hours Table Form Test', () => {
    it('should render and show loading info', () => {
        setup()

        expect(screen.getByLabelText('loading-info')).toBeTruthy()
    })

    it('should have set month info', () => {
        global.fetch = jest.fn().mockImplementation(setupFetchStub({}))
        setup()

        expect(getMonthDataSpy).toHaveBeenCalled()
        expect(newMonthDataSpy).toHaveBeenCalledTimes(0)
    })

    it('should have called new month info endpoint', () => {
        global.fetch = jest.fn().mockImplementation(setupFetchStub([]))
        setup()

        expect(getMonthDataSpy).toHaveBeenCalled()
        expect(newMonthDataSpy).toHaveBeenCalledTimes(1)
    })

    it('should call save endpoint', () => {
        global.fetch = jest.fn().mockImplementation(setupFetchStub([]))
        setup({
            currentMonthData: {
                id: 1,
                total_hours: "00:00",
                needed_hours: "00:00",
                diff_hours: "00:00",
                data: [
                    {
                        arrive: "01:00",
                        lunchBreak: "01:00",
                        total: "01:00"
                    }
                ]
            }
        })

        row = screen.getByLabelText('edit')
        userEvent.click(row)
        row = screen.getByLabelText('save')
        userEvent.click(row)

        expect(updateMonthDataSpy).toHaveBeenCalledTimes(1)
    })
})