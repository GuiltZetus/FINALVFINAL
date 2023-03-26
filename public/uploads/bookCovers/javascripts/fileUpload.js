FilePond.registerPlugin(
    FilePondPluginImgagePreview,
    FilePondPluginImgageResize,
    FilePondPluginFileEncode,
)

FilePond.SetOptions({
    stylePanelAspectRatio: 150 / 100,
    imageResizeTargetWidth : 100,
    imageResizeTargetHeight : 150
})

FilePond.parse(document.body);