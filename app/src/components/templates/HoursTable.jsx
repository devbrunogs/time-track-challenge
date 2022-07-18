import React, { useEffect, useState } from 'react'

import EditableRow from '../orgs/EditableHoursRow'

import hourRest from '../../rest/hours'

import {
    getCurrentMonth,
    getCurrentYear,
    buildMonthData,
    buildMonthUpdatedData,
    checkForNegativeHours
} from '../../helpers/functions'

function HoursTable(props) {
    const {
        userInfo,
        setMonthData,
        currentMonthData
    } = props
    const [editingRow, setEditingRow] = useState(null)

    useEffect(() => {
        hourRest.getCurrentMonthData(getCurrentYear(), getCurrentMonth(), userInfo.id)
            .then(res => {
                if (res.length) {
                    setMonthData(res[0])
                } else {
                    const newData = buildMonthData(getCurrentYear(), getCurrentMonth(), userInfo.id)
                    hourRest.setNewMonthTable(newData).then(res => {
                        setMonthData(res)
                    })
                }
            })
    }, [])

    function saveRowInfo(index, rowInfo) {
        const newMonthData = buildMonthUpdatedData(index, rowInfo, currentMonthData)

        hourRest.updateMonthData(newMonthData.id, newMonthData)
            .then(res => {
                setMonthData(res)
            })
    }

    function cancelEdition() {
        setEditingRow(null)
        setMonthData(currentMonthData)
    }

    function isMonthSet() {
        return currentMonthData && currentMonthData.data
    }

    function getLaborDays() {
        return isMonthSet() ? currentMonthData.data.map((item, index) => {
            return (
                <EditableRow
                    key={index}
                    row={index}
                    day={index + 1}
                    arrive={item.arrive}
                    lunchBreak={item.lunchBreak}
                    lunchReturn={item.lunchReturn}
                    exit={item.exit}
                    total={item.total}
                    editing={editingRow === index}
                    setEditingRow={setEditingRow}
                    saveRowInfo={saveRowInfo}
                    cancelEdition={cancelEdition}
                />
            )
        }) : <h4 aria-label="loading-info">Gathering information</h4>
    }

    function getTotalInformation() {
        const isNegativeTotalClass = checkForNegativeHours(currentMonthData.diff_hours) ? 'text-success' : 'text-danger'

        return isMonthSet() ? (
            <div className="table-row">
                <div className="pad-leftXL">&#9998;</div>
                <div className="text-right pad-rightSM">Month</div>
                <div>{currentMonthData.needed_hours}</div>
                <div className="text-right pad-rightSM">Hours Difference</div>
                <div className={isNegativeTotalClass}>{currentMonthData.diff_hours}</div>
                <div className="text-right pad-rightSM">Total</div>
                <div className={isNegativeTotalClass}>{currentMonthData.total_hours}</div>
            </div>
        ) : null
    }

    return (
        <div className="hours-table">
            <div className="table-row">
                <div className="pad-leftXL">&#9998;</div>
                <div>Day</div>
                <div>Arrive</div>
                <div>Lunch</div>
                <div>Return</div>
                <div>Leave</div>
                <div>Total</div>
            </div>
            <div className="table-body">
                {getLaborDays()}
            </div>
            <div className="table-footer">
                {getTotalInformation()}
            </div>
        </div>
    )
}

export default HoursTable