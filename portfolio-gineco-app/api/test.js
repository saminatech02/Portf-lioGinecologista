export default function handler(req, res) {
  return res.status(200).json({
    status: "success",
    message: "API test funcionando",
    method: req.method,
    url: req.url
  });
}