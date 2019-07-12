package com.infotel.trombinoscope.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UploadFileResponse {
    private String name;
    private String downloadUri;
    private String type;
    private long size;

    public UploadFileResponse(String fileName, String fileDownloadUri, String fileType, long size) {
        this.name = fileName;
        this.downloadUri = fileDownloadUri;
        this.type = fileType;
        this.size = size;
    }
}