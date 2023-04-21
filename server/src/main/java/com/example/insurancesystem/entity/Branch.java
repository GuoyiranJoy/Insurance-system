package com.example.insurancesystem.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
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
 * @since 2023-04-12
 */
@Getter
@Setter
@ApiModel(value = "Branch对象", description = "")
public class Branch implements Serializable {

    private static final long serialVersionUID = 1L;

      @TableId(value = "branch_id", type = IdType.AUTO)
    private Integer branchId;

    private String branchName;


}
