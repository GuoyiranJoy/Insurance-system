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
@TableName("param_diff")
@ApiModel(value = "ParamDiff对象", description = "")
public class ParamDiff implements Serializable {

    private static final long serialVersionUID = 1L;

      private Integer id;

    private String paramDiffName;

    private String description;


}
