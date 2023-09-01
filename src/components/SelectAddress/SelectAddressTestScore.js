import { Col, Form, Row, Select } from "antd"
import { useEffect, useState, forwardRef, useImperativeHandle } from "react"
import FlSelect from "src/components/FloatingLabel/Select"
import BusinessService from "src/services/BusinessService"
import RegionService from "src/services/RegionService"
import styled from "styled-components"

const { Option } = Select

const Styled = styled.div`
  .ant-select-selection-placeholder {
    z-index: 10;
  }
`
const SelectAddressTestScore = forwardRef(
  (
    {
      form,
      initValue,
      onBeforeLoading = () => {},
      onLoadingSuccuss = () => {},
      floating = true,
      required = true,
      isTestScore,
      allowClear,
    },
    ref,
  ) => {
    const [listProvince, setListProvince] = useState()
    const [listDistrict, setListDistrict] = useState()
    const [listWard, setlistWard] = useState()
    const [listTestScore, setListTestScore] = useState()

    const [selected, setSelected] = useState({
      province: {},
      district: {},
      ward: {},
      testScore: {},
    })
    useImperativeHandle(
      ref,
      () => {
        return {
          address: selected,
        }
      },
      [selected],
    )

    useEffect(() => {
      getListProvinceVN()
      return () => {
        form.resetFields()
      }
    }, [])

    useEffect(() => {
      if (
        initValue?.provinceId &&
        listProvince?.length &&
        !selected?.province?.key
      ) {
        const province = listProvince?.find(
          i => i?.RegionID === initValue?.provinceId,
        )
        setSelected(pre => ({
          ...pre,
          province: {
            key: province?.ParentID,
            value: province?.ParentID,
            children: province?.RegionName,
          },
        }))
      }
      if (
        initValue?.districtId &&
        listDistrict?.length &&
        !selected?.district?.key
      ) {
        const district = listDistrict?.find(
          i => i?.RegionID === initValue?.districtId,
        )
        setSelected(pre => ({
          ...pre,
          district: {
            key: district?.ParentID,
            value: district?.ParentID,
            children: district?.RegionName,
          },
        }))
      }

      if (initValue?.provinceId && listWard?.length && !selected?.ward?.key) {
        const ward = listWard?.find(i => i?.RegionID === initValue?.wardId)
        setSelected(pre => ({
          ...pre,
          ward: {
            key: ward?.ParentID,
            value: ward?.ParentID,
            children: ward?.RegionName,
          },
        }))
      }
      if (
        initValue?.provinceId &&
        listTestScore?.length &&
        !selected?.testScore?.key
      ) {
        const testScore = listTestScore
        setSelected(pre => ({
          ...pre,
          testScore: {
            key: testScore?.AccountID,
            value: testScore?.AccountID,
            children: testScore?.AccountName,
          },
        }))
      }
    }, [initValue, listProvince, listDistrict, listWard, listTestScore])

    useEffect(() => {
      if (initValue?.provinceId) onChangeProvince(initValue?.provinceId)
      if (initValue?.districtId) onChangeDistrict(initValue?.districtId)
      if (initValue?.provinceId)
        form?.setFieldsValue({
          provinceId: !!initValue?.provinceId
            ? initValue?.provinceId
            : undefined,
          districtId: !!initValue?.districtId
            ? initValue?.districtId
            : undefined,
          wardId: !!initValue?.wardId ? initValue?.wardId : undefined,
          testScoreId: !!initValue?.testScoreId
            ? initValue?.testScoreId
            : undefined,
        })
    }, [initValue])

    const getListProvinceVN = () => {
      onBeforeLoading()
      RegionService.getByRegionId({ regionId: 234 })
        .then(res => {
          if (res?.isError) return
          setListProvince(res?.Object)
        })
        .finally(onLoadingSuccuss)
    }

    const onChangeProvince = (e, province) => {
      setListTestScore([])
      form.resetFields(
        !!isTestScore
          ? [`districtId`, `wardId`, `testScoreId`]
          : [`districtId`, `wardId`],
      )
      if (!e) {
        setListDistrict([])
        !!isTestScore && setListTestScore([])
        return
      }
      setSelected(pre => ({ ...pre, province }))
      onBeforeLoading()
      RegionService.getByRegionId({ regionId: e })
        .then(res => {
          if (res?.isError) return
          const lstDistrict = res?.Object?.filter(i => i.ParentID === e)
          setListDistrict(lstDistrict)
        })
        .finally(onLoadingSuccuss)

      !!isTestScore && onBeforeLoading()

      !!isTestScore &&
        BusinessService.getAll({
          RegionID: e,
          Status: 0,
          type: 2,
          textSearch: "",
        })
          .then(res => {
            if (res?.isError) return
            setListTestScore(res?.Object)
          })
          .finally(onLoadingSuccuss)
    }

    const onChangeDistrict = (e, district) => {
      setListTestScore([])
      form.resetFields(!!isTestScore ? [`wardId`, `testScoreId`] : [`wardId`])
      if (!e) {
        setlistWard([])
        !!isTestScore && setListTestScore([])
        return
      }
      setSelected(pre => ({ ...pre, district }))

      onBeforeLoading()
      RegionService.getByRegionId({ regionId: e })
        .then(res => {
          if (res?.isError) return
          const lstWard = res?.Object?.filter(i => i.ParentID === e)
          setlistWard(lstWard)
        })
        .finally(onLoadingSuccuss)

      !!isTestScore && onBeforeLoading()

      !!isTestScore &&
        BusinessService.getAll({
          RegionID: e,
          Status: 0,
          type: 2,
          textSearch: "",
        })
          .then(res => {
            if (res?.isError) return
            setListTestScore(res?.Object)
          })
          .finally(onLoadingSuccuss)
    }

    const onChangeWard = (e, ward) => {
      setListTestScore([])
      !!isTestScore && form.resetFields([`testScoreId`])
      if (!e) {
        !!isTestScore && setListTestScore([])
        return
      }
      setSelected(pre => ({ ...pre, ward }))

      !!isTestScore && onBeforeLoading()

      !!isTestScore &&
        BusinessService.getAll({
          RegionID: e,
          Status: 0,
          type: 2,
          textSearch: "",
        })
          .then(res => {
            if (res?.isError) return
            setListTestScore(res?.Object)
          })
          .finally(onLoadingSuccuss)
    }

    const onChangeTestScore = (e, testScore) =>
      setSelected(pre => ({ ...pre, testScore }))

    return (
      <Styled>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8} id="provinceFixScroll">
            <Form.Item
              name="provinceId"
              rules={
                required && [
                  { required: true, message: "Thông tin không được để trống" },
                ]
              }
              required={required}
              label={!floating && "Tỉnh/Thành phố"}
            >
              <FlSelect
                getPopupContainer={() =>
                  document.getElementById("provinceFixScroll")
                }
                maxTagCount="responsive"
                showSearch
                allowClear={allowClear}
                isRequired={required}
                placeholder={!floating && "Chọn Tỉnh/Thành phố"}
                onChange={onChangeProvince}
                style={{ width: "100%" }}
                label={!!floating && "Tỉnh/Thành phố"}
              >
                {listProvince?.length &&
                  listProvince?.map(i => (
                    <Option key={i.RegionID} value={i.RegionID}>
                      {i.RegionName}
                    </Option>
                  ))}
              </FlSelect>
            </Form.Item>
          </Col>

          <Col xs={24} md={8} id="districtFixScroll">
            <Form.Item
              name="districtId"
              rules={
                required &&
                !isTestScore && [
                  { required: true, message: "Thông tin không được để trống" },
                ]
              }
              label={!floating && "Quận/Huyện"}
              required={required && !isTestScore}
            >
              <FlSelect
                getPopupContainer={() =>
                  document.getElementById("districtFixScroll")
                }
                maxTagCount="responsive"
                showSearch
                allowClear={allowClear}
                isRequired={required}
                placeholder={!floating && "Chọn Quận/Huyện"}
                onChange={onChangeDistrict}
                style={{ width: "100%" }}
                label={!!floating && "Quận/Huyện"}
              >
                {listDistrict?.length &&
                  listDistrict?.map(i => (
                    <Option key={i.RegionID} value={i.RegionID}>
                      {i.RegionName}
                    </Option>
                  ))}
              </FlSelect>
            </Form.Item>
          </Col>

          <Col xs={24} md={8} id="wardFixScroll">
            <Form.Item
              name="wardId"
              rules={
                required &&
                !isTestScore && [
                  { required: true, message: "Thông tin không được để trống" },
                ]
              }
              label={!floating && "Xã/Phường"}
              required={required && !isTestScore}
            >
              <FlSelect
                getPopupContainer={() =>
                  document.getElementById("wardFixScroll")
                }
                maxTagCount="responsive"
                showSearch
                allowClear={allowClear}
                placeholder={!floating && "Chọn Xã/Phường"}
                isRequired={required}
                onChange={onChangeWard}
                style={{ width: "100%" }}
                label={!!floating && "Xã/Phường"}
              >
                {listWard?.length &&
                  listWard?.map(i => (
                    <Option key={i.RegionID} value={i.RegionID}>
                      {i.RegionName}
                    </Option>
                  ))}
              </FlSelect>
            </Form.Item>
          </Col>
          {!!isTestScore && (
            <Col xs={24} md={24} id="testScoreFixScroll">
              <Form.Item
                name="testScoreId"
                rules={
                  required && [
                    {
                      required: true,
                      message: "Thông tin không được để trống",
                    },
                  ]
                }
                label={!floating && "Điểm xét nghiệm"}
                required={required}
              >
                <FlSelect
                  getPopupContainer={() =>
                    document.getElementById("testScoreFixScroll")
                  }
                  maxTagCount="responsive"
                  showSearch
                  allowClear={!required}
                  placeholder={!floating && "Chọn điểm xét nghiệm"}
                  isRequired={required}
                  onChange={onChangeTestScore}
                  style={{ width: "100%" }}
                  label={!!floating && "Điểm xét nghiệm"}
                >
                  {listTestScore?.Data?.length &&
                    listTestScore?.Data?.map(i => (
                      <Option key={i.AccountID} value={i.AccountID}>
                        {i.AccountName}
                      </Option>
                    ))}
                </FlSelect>
              </Form.Item>
            </Col>
          )}
        </Row>
      </Styled>
    )
  },
)

export default SelectAddressTestScore
