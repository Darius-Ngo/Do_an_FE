import React, { useState, useEffect } from "react"
import { StatisticItem, StatisticStyle } from "./styled"
import { Col, Row, Select, Space, Spin, Tooltip as TooltipAntd } from "antd"
import FlDatePicker from "src/components/FloatingLabel/DatePicker"
import dayjs from "dayjs"
import SvgIcon from "src/components/SvgIcon"
import { COLOR_STATUS_ORDER } from "src/constants/constants"
import StatisticService from "src/services/StatisticService"
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js"
import ChartDataLabels from "chartjs-plugin-datalabels"
import { Chart, Pie } from "react-chartjs-2"
import { formatMoneyVND } from "src/lib/utils"
import ListOrder from "./components/ListOrder"

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
)

const columnsChartPie = [
  "#28BF80",
  // "#01638D",
  // "#2A8FFC",
  // "#5084BB",
  "#72B6FF",
  "#FFA0A0",
  // "#E86C6C",
  "#902121",
  // "#9586F2",
  "#5F4CD7",
  "#D4A266",
  "#F1B063",
  "#FF8A00",
  "#AF9F0A",
  "#FFE925",
  "#F0DF47",
  "#018D0F",
  "#64CEA2",
  "#0A8D57",
  "#28BF80",
  "#01638D",
  "#2A8FFC",
  "#5084BB",
  "#72B6FF",
  "#FFA0A0",
  "#E86C6C",
  "#902121",
  "#9586F2",
  "#5F4CD7",
  "#D4A266",
  "#F1B063",
  "#FF8A00",
  "#AF9F0A",
  "#FFE925",
  "#F0DF47",
  "#018D0F",
  "#64CEA2",
  "#0A8D57",
]

const Statistic = () => {
  const [loading, setLoading] = useState(false)
  const [dataOrder, setDataOrder] = useState({})
  const [totalMoneyOrder, setTotalMoneyOrder] = useState(0)
  const [dataProduct, setDataProduct] = useState([])
  const [dataCategory, setDataCategory] = useState([])
  const [condition, setCondition] = useState({
    fromDate: dayjs().startOf("month"),
    toDate: dayjs(),
  })

  const getStatisticOrder = async () => {
    try {
      setLoading(true)
      const body = {
        ...condition,
        fromDate: condition?.fromDate ? condition.fromDate.format() : null,
        toDate: condition?.toDate ? condition.toDate.format() : null,
      }
      const res = await StatisticService.getStatisticOrder(body)
      const res2 = await StatisticService.getStatisticProductTrend(body)
      const res3 = await StatisticService.getStatisticByCategory(body)
      if (res?.isError) return
      setDataOrder(res?.Object?.countOrder)
      setTotalMoneyOrder(res?.Object?.tong_doanh_so)
      if (res2?.isError) return
      setDataProduct(res2?.Object)
      if (res3?.isError) return
      setDataCategory(res3?.Object)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getStatisticOrder()
  }, [condition])

  // chart bar
  const dataChart = {
    labels: dataCategory?.map(item => item?.ten_loai_san_pham),
    datasets: [
      // {
      //   type: "line",
      //   label: "Doanh số",
      //   backgroundColor: "#018D0F",
      //   borderColor: "#018D0F",
      //   borderWidth: 2,
      //   fill: false,
      //   data: dataCategory?.map(item => +item?.tong_tien),
      //   yAxisID: "y1",
      // },
      {
        label: "Doanh số",
        backgroundColor: "#018D0F",
        borderColor: "#018D0F",
        yAxisID: "y1", // Chỉ định trục dọc bên phải
        type: "line", // Chỉ định loại biểu đồ là đường
        borderWidth: 2,
        fill: false,
        // stack: 1,
        hoverBackgroundColor: "rgba(5, 150, 105 ,0.4)",
        hoverBorderColor: "rgba(5, 150, 105 ,1)",
        // barPercentage: 0.5, // Điều chỉnh tỷ lệ chiều rộng của các cột
        // categoryPercentage: 0.6, // Điều chỉnh tỷ lệ chiều rộng của các cột
        barThickness: 40, // Độ rộng cột
        data: dataCategory?.map(item => +item?.tong_tien),
      },
      {
        label: "Số lượng sản phẩm",
        backgroundColor: "#E86C6C",
        borderColor: "#E86C6C",
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        barPercentage: 0.5, // Điều chỉnh tỷ lệ chiều rộng của các cột
        // categoryPercentage: 0.6, // Điều chỉnh tỷ lệ chiều rộng của các cột
        data: dataCategory?.map(item => item?.tong_sp_db),
        borderWidth: 1,
        barThickness: 40, // Độ rộng cột
        yAxisID: "y",
      },
    ],
  }

  const optionsBar = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        // labels: {
        //   usePointStyle: true,
        //   boxWidth: 10,
        //   boxHeight: 5,
        // },
      },
      tooltip: {
        mode: "index",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Loại sản phẩm",
          font: { weight: "bold" },
          align: "end",
        },
      },
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Số sản phẩm",
          font: { weight: "bold" },
          align: "end",
        },
        //   beginAtZero: true, // Bắt đầu từ 0
        //   ticks: {
        //     stepSize: 1, // Bước tăng giá trị của trục y
        //   },
        //   title: {
        //     transform: "rotate(0deg)",
        //     display: true,
        //     text: "Số sản phẩm",
        //     font: { weight: "bold" },
        //     align: "end",
        //   },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Doanh số",
          font: { weight: "bold" },
          align: "end",
        },
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
        // min: 0,
        // max: Math.max(...(dataCategory?.map(item => +item?.tong_tien) || [])),
      },
    },
  }
  // chart pie
  const dataStatisPie = dataProduct?.map((item, idx) => ({
    color: columnsChartPie[idx],
    phan_tram: item?.phan_tram,
    tong_sp_db: item?.tong_sp_db,
    tong_tien: formatMoneyVND(+item?.tong_tien),
    ten_san_pham: item?.ten_san_pham,
  }))
  const optionPie = {
    plugins: {
      tooltip: {
        callbacks: {
          title: tooltipModel =>
            `Tên sản phẩm: ${tooltipModel?.[0]?.label} \nSố lượng đã bán: ${
              dataStatisPie?.find(
                i => i?.ten_san_pham === tooltipModel?.[0]?.label,
              )?.tong_sp_db
            } \nDoanh số: ${
              dataStatisPie?.find(
                i => i?.ten_san_pham === tooltipModel?.[0]?.label,
              )?.tong_tien
            }`,
          label: tooltipModel => "",
        },
      },
      legend: {
        display: false,
        position: "bottom",
        align: "center",
        anchor: "center",
        labels: {
          padding: 10, // Khoảng cách giữa các label
          boxWidth: 18, // Kích thước ô chứa label
          boxHeight: 18,
        },
      },
    },
  }
  const dataPie = {
    labels: dataStatisPie?.map(item => item?.ten_san_pham),
    datasets: [
      {
        data: dataStatisPie?.map(item => item?.phan_tram),
        backgroundColor: dataStatisPie?.map(item => item?.color),
        borderColor: "#fff",
        borderWidth: 1,
        datalabels: {
          color: "#fff",
          anchor: "center",
          align: "center",
          offset: 10,
          font: {
            size: 12,
          },
          formatter: value => {
            if (!!value) return `${value}%`
            return ""
          },
          render: "percentage",
        },
      },
    ],
  }
  const [showMore, setShowMore] = useState(8)
  const handleChangeShowMore = event => {
    window.scrollTo(0, 0)

    setShowMore(event)
  }

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
        <Row gutter={[16, 16]}>
          <Col span={4}>
            <StatisticItem
              color={COLOR_STATUS_ORDER[1]}
              className="algin-items-center"
            >
              <div
                className="d-flex align-items-center fw-600 fs-20"
                style={{ color: "var(--color-primary)" }}
              >
                <span>Tổng đơn:</span>
                <span className="ml-8">{dataOrder?.tong_don || 0}</span>
              </div>
              {/* <div className="statistic-icon mr-12">
                <SvgIcon name="order-step1" className="icon-1" />
              </div>
              <div className="statistic-content">
                <div className="title-item fw-600">Tổng đơn</div>
                <div className="value-item">50</div>
              </div> */}
            </StatisticItem>
          </Col>
          <Col span={4}>
            <StatisticItem color={COLOR_STATUS_ORDER[1]}>
              <div className="statistic-icon mr-12">
                <SvgIcon name="order-step1" className="icon-1" />
              </div>
              <div className="statistic-content">
                <div className="title-item">Chờ xác nhận</div>
                <div className="value-item">{dataOrder?.cho_xac_nhan || 0}</div>
              </div>
            </StatisticItem>
          </Col>
          <Col span={4}>
            <StatisticItem color={COLOR_STATUS_ORDER[2]}>
              <div className="statistic-icon mr-12">
                <SvgIcon name="order-step2" className="icon-2" />
              </div>
              <div className="statistic-content">
                <div className="title-item">Chờ vận chuyển</div>
                <div className="value-item">
                  {dataOrder?.cho_van_chuyen || 0}
                </div>
              </div>
            </StatisticItem>
          </Col>
          <Col span={4}>
            <StatisticItem color={COLOR_STATUS_ORDER[3]}>
              <div className="statistic-icon mr-12">
                <SvgIcon name="order-step3" className="icon-3" />
              </div>
              <div className="statistic-content">
                <div className="title-item">Đang giao hàng</div>
                <div className="value-item">
                  {dataOrder?.dang_van_chuyen || 0}
                </div>
              </div>
            </StatisticItem>
          </Col>
          <Col span={4}>
            <StatisticItem color={COLOR_STATUS_ORDER[4]}>
              <div className="statistic-icon mr-12">
                <SvgIcon name="order-step4" className="icon-4" />
              </div>
              <div className="statistic-content">
                <div className="title-item">Đã giao</div>
                <div className="value-item">{dataOrder?.da_giao || 0}</div>
              </div>
            </StatisticItem>
          </Col>
          <Col span={4}>
            <StatisticItem color={COLOR_STATUS_ORDER[6]}>
              <div className="statistic-icon mr-12">
                <SvgIcon name="order-step0" className="icon-5" />
              </div>
              <div className="statistic-content">
                <div className="title-item">Đã hủy</div>
                <div className="value-item">{dataOrder?.da_huy || 0}</div>
              </div>
            </StatisticItem>
          </Col>
          <Col span={14}>
            <div className="box-border w-100 h-100 mb-0">
              <div className="pt-8 pf-16 pr-16 pb-8 tex-transform-uper text-center fs-16 fw-600">
                Thống kê theo loại sản phẩm
              </div>
              <hr style={{ borderTop: "0.1px solid #e5e5e5" }} />
              <div className="pl-16 pr-16 h-100 ">
                <Chart
                  type="bar"
                  data={dataChart}
                  width={800}
                  height={640}
                  options={optionsBar}
                />
              </div>
            </div>
          </Col>
          <Col span={10}>
            <div className="box-border mb-0">
              <div className="pt-8 pf-16 pr-16 pb-8 tex-transform-uper text-center fs-16 fw-600">
                Thống kê theo sản phẩm
              </div>
              <hr style={{ borderTop: "0.1px solid #e5e5e5" }} />
              <div style={{ padding: "0px 120px" }} className="mt-50 mb-50">
                <Pie
                  data={dataPie}
                  options={optionPie}
                  plugins={[ChartDataLabels]}
                />
              </div>
              <hr
                className={showMore === 5 ? "v-hidden" : ""}
                style={{ borderTop: "0.1px solid #e5e5e5" }}
              />
              <Row
                style={{
                  overflow: "auto",
                  height: "192px",
                }}
                className="mt-16 w-100 pl-12 pr-4"
              >
                {dataStatisPie?.slice(0, showMore)?.map((item, idx) => (
                  <div
                    key={`themecolor${idx}`}
                    style={{ width: "50%" }}
                    // style={{width: "20%"}}
                  >
                    <div className="d-flex-start">
                      <div>
                        <div className="d-flex-start">
                          <div
                            style={{
                              margin: "0px 5px",
                              width: "20px",
                              height: "20px",
                              padding: "auto",
                              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                              background: item?.color,
                              color: item?.color,
                            }}
                          />
                        </div>
                      </div>
                      <TooltipAntd
                        title={item?.ten_san_pham}
                        mouseLeaveDelay={0}
                      >
                        <div className=" max-line1 ml-5">
                          {item?.ten_san_pham}
                        </div>
                      </TooltipAntd>
                    </div>
                  </div>
                ))}
                {/* <div
                    className="button-show-more"
                    style={{ height: "96px", width: "33.33%" }}
                    onClick={() =>
                      handleChangeShowMore(
                        showMore === 5 ? dataStatisPie?.length : 5,
                      )
                    }
                  >
                    {showMore === 5 ? "Xem thêm" : "Ẩn bớt"}&#62;&#62;{" "}
                  </div> */}
              </Row>
            </div>
          </Col>
          <Col span={24}>
            <div className="box-border pt-0 pb-0">
              <ListOrder
                date={{
                  ...condition,
                  fromDate: condition?.fromDate
                    ? condition.fromDate.format()
                    : null,
                  toDate: condition?.toDate ? condition.toDate.format() : null,
                }}
                totalMoneyOrder={totalMoneyOrder}
              />
            </div>
          </Col>
        </Row>
      </Spin>
    </StatisticStyle>
  )
}

export default Statistic
