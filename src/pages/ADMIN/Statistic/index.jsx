import React, { useState, useEffect } from "react"
import { StatisticStyle } from "./styled"
import { Space, Spin } from "antd"
import FlDatePicker from "src/components/FloatingLabel/DatePicker"
import moment from "moment"
import dayjs from "dayjs"

const Statistic = () => {
  const [loading, setLoading] = useState(false)
  const [condition, setCondition] = useState({
    fromDate: dayjs().startOf("month"),
    toDate: dayjs(),
  })

  return (
    <StatisticStyle>
      <Spin spinning={loading}>
        <div className="title-type-1 d-flex justify-content-space-between align-items-center pb-8 pt-0 mb-16">
          <div style={{ fontSize: 24 }}>Thống kê</div>
          <Space size={12} className="fw-500">
            <FlDatePicker
              label={"Từ ngày"}
              style={{ width: 200 }}
              value={condition?.fromDate}
              disabledDate={current =>
                current && current > dayjs().endOf("day")
              }
              onChange={fromDate =>
                setCondition({
                  ...condition,
                  fromDate,
                })
              }
            />
            <FlDatePicker
              label={"Đến ngày"}
              style={{ width: 200 }}
              value={condition?.toDate}
              onChange={toDate =>
                setCondition({
                  ...condition,
                  toDate,
                })
              }
              disabledDate={current =>
                (current && current > dayjs().endOf("day")) ||
                current <= condition?.fromDate
              }
            />
          </Space>
        </div>
      </Spin>
    </StatisticStyle>
  )
}

export default Statistic
