package com.example.insurancesystem.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * <p>
 * 
 * </p>
 *
 * @author 郭怡然
 * @since 2023-03-14
 */
@Getter
@Setter
@TableName("rate_param_name")
@ApiModel(value = "RateParamName对象", description = "")
public class RateParamName implements Serializable {

    private static final long serialVersionUID = 1L;

      private Integer id;

    private String rateName;

    private String description;


}
