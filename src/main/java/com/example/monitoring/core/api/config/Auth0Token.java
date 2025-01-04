package com.example.monitoring.core.api.config;

import com.google.gson.annotations.SerializedName;
import lombok.Data;

@Data
public class Auth0Token {
    @SerializedName("sub")
    private String sub;

    @SerializedName("nickname")
    private String nickname;

    @SerializedName("name")
    private String name;

    @SerializedName("picture")
    private String picture;

    @SerializedName("updated_at")
    private String updatedAt;

    @SerializedName("email")
    private String email;

    @SerializedName("email_verified")
    private boolean emailVerified;
}
