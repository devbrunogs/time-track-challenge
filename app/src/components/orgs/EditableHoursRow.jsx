import React, { useEffect, useState } from 'react'
import TimeInput from '../atoms/TimeInput'
import Button from '../atoms/Button'

import {
    getHoursDifferenceSeconds,
    getHoursTotalString
} from '../../helpers/functions'

function EditableRow(props) {
    const {
        row,
        day,
        arrive,
        lunchBreak,
        lunchReturn,
        exit,
        total,
        editing,
        setEditingRow,
        saveRowInfo,
        cancelEdition
    } = props

    const [editArrive, setEditArrive] = useState(arrive)
    const [editLunchBreak, setLunchBreak] = useState(lunchBreak)
    const [editLunchReturn, setLunchReturn] = useState(lunchReturn)
    const [editExit, setExit] = useState(exit)

    useEffect(() => {
        setEditArrive(arrive)
        setLunchBreak(lunchBreak)
        setLunchReturn(lunchReturn)
        setExit(exit)
    }, [editing])

    function saveEdition() {
        let shift1, shift2, updatedTotal

        if (editLunchBreak && editArrive && editExit && editLunchReturn) {
            shift1 = getHoursDifferenceSeconds(editArrive, editLunchBreak)
            shift2 = getHoursDifferenceSeconds(editLunchReturn, editExit)

            updatedTotal = getHoursTotalString(shift1, shift2)
        }

        saveRowInfo(row, {
            arrive: editArrive,
            lunchBreak: editLunchBreak,
            lunchReturn: editLunchReturn,
            exit: editExit,
            total: updatedTotal || total
        })

        setEditingRow(null)
    }

    function getEditForm() {
        if (editing) {
            return (
                <>
                    <Button
                        extraClasses="primary"
                        name="save"
                        onClick={saveEdition}
                    >
                        Save
                    </Button>
                    <Button
                        extraClasses="secondary-action"
                        name="cancel"
                        onClick={cancelEdition}
                    >
                            cancel
                    </Button>
                </>
            )
        }

        return <Button
                    extraClasses="secondary-action"
                    name="edit"
                    onClick={() => setEditingRow(row)}
                >
                    Edit
                </Button>
    }

    return (
        <div className="table-row" aria-label="editable-row">
            <div>
                {getEditForm()}
            </div>
            <div>{day}</div>
            <div>
                <TimeInput
                    value={editArrive}
                    disabled={!editing}
                    onChange={(e) => setEditArrive(e.target.value)}
                    min={`06:00`}
                    required
                />

            </div>
            <div>
                <TimeInput
                    value={editLunchBreak}
                    disabled={!editing}
                    onChange={(e) => setLunchBreak(e.target.value)}
                    min={`${editArrive}`}
                    required
                />

            </div>
            <div>
                <TimeInput
                    value={editLunchReturn}
                    disabled={!editing}
                    onChange={(e) => setLunchReturn(e.target.value)}
                    min={`${editLunchBreak}`}
                    required
                />

            </div>
            <div>
                <TimeInput
                    value={editExit}
                    disabled={!editing}
                    onChange={(e) => setExit(e.target.value)}
                    min={`${editLunchReturn}`}
                    required
                />
            </div>
            <div>{total}</div>
        </div>
    )
}

export default EditableRow