export const getFileName = (file: string) => {
  const fileName = file.split('/').pop() || 'Attachment'
  return fileName
}
