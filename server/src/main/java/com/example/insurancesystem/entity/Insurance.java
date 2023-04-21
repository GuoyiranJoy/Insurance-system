package com.example.insurancesystem.entity;

import cn.hutool.json.JSON;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.handlers.FastjsonTypeHandler;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import springfox.documentation.spring.web.json.Json;

/**
 * <p>
 * 
 * </p>
 *
 * @author 郭怡然
 * @since 2023-04-09
 */
@Getter
@Setter
@ApiModel(value = "Insurance对象", description = "")
@TableName(value = "insurance",autoResultMap = true)
public class Insurance extends CommissionRate implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "insur_id", type = IdType.AUTO)
    private Integer insurId;
    @ApiModelProperty(value = "公司名",required = true,example = "天安财险")
    //必填
    private String companyName;
    @ApiModelProperty(value = "险种全名",required = true)
    //必填
    private String insurFullName;

    private String insurShortName;
    //必填
    private String code;
    //必填
    @ApiModelProperty("主附约")
    private String mainOrVice;
    //必填
    @ApiModelProperty("参数区别")
    private String paramDiffName;
    //必填
    @ApiModelProperty("险种类别")
    private String insurType;
    //必填
    private LocalDate startSaleTime;
    //必填
    private LocalDate stopSaleTime;

    private String remark;

    @ApiModelProperty("交费年期")
    @JsonProperty("commonYear")
    @TableField(typeHandler = FastjsonTypeHandler.class)
    private List<PaymentPeriod> commonYear;


}
