{
    "manifest_version": 3,
    "name": "Roon",
    "version": "1.0",
    "description": "Description of your extension.",
    "web_accessible_resources": [
        {
            "resources": [
                "https://github.com/Ro-on/ro-on.github.io/tree/main/images",
                "https://github.com/Ro-on/ro-on.github.io/tree/main/videos",
                
            ],
            "matches": [
                https://.github.io/
            ]
        }
    ],
    "permissions": [
        "activeTab",
        "scripting"
    ],
    // другие ключи манифеста...
}