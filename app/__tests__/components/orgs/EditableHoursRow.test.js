import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import EditableHoursRow from '../../../src/components/orgs/EditableHoursRow';

let onChangeSpy, saveRowSpy, setEditingRowSpy, cancelEditingRowSpy, row

function setup(extraParams = {}) {
    onChangeSpy = jest.fn()
    setEditingRowSpy = jest.fn()
    cancelEditingRowSpy = jest.fn()
    saveRowSpy = jest.fn()

    return render(
        <EditableHoursRow
            name={'time'}
            onChange={onChangeSpy}
            setEditingRow={setEditingRowSpy}
            cancelEdition={cancelEditingRowSpy}
            saveRowInfo={saveRowSpy}
            editing={extraParams.editing}
            arrive={extraParams.arrive}
            lunchBreak={extraParams.lunchBreak}
            lunchReturn={extraParams.lunchReturn}
            exit={extraParams.exit}
        />
    )
}

describe('EditableHoursRow Test', () => {
    it('should render', () => {
        setup()

        row = screen.getByLabelText('editable-row')

        expect(row).toBeTruthy()
    })

    it('should call editing method', () => {
        setup()

        row = screen.getByLabelText('edit')
        userEvent.click(row)

        expect(setEditingRowSpy).toHaveBeenCalledTimes(1)
    })

    it('should call cancel editing method', () => {
        setup({editing: true})

        row = screen.getByLabelText('cancel')
        userEvent.click(row)

        expect(cancelEditingRowSpy).toHaveBeenCalledTimes(1)
    })

    it('should call save method', () => {
        setup({
            editing: true,
            arrive: '08:00',
            lunchBreak: '12:00',
            lunchReturn: '13:00',
            exit: '18:00',
        })

        row = screen.getByLabelText('save')
        userEvent.click(row)

        expect(saveRowSpy).toHaveBeenCalledTimes(1)
    })
})