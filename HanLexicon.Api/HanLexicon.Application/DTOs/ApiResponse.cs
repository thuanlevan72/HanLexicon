using System.Net;

namespace HanLexicon.Application.DTOs
{
    /// <summary>
    /// Api response for standardized API responses across the application.
    /// Author: QuanTM
    /// Created date: 2026-04-23
    /// Last modified date: 2026-04-23
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class ApiResponse<T> where T : class
    {
        /// <summary>
        /// Is the API call successful? True for success, false for failure. This is a quick check for clients to determine if the request was processed successfully without needing to inspect the status code or message.
        /// </summary>
        public bool IsSuccess { get; set; }

        /// <summary>
        /// Status code of the API response, using standard HTTP status codes to indicate the result of the request. For example, 200 for success, 400 for bad request, 500 for server error, etc. This allows clients to easily understand the outcome of their request and handle it accordingly.
        /// </summary>
        public HttpStatusCode StatusCode { get; set; }

        /// <summary>
        /// Message providing additional information about the API response. This can be used to convey success messages, error details, or any other relevant information that can help clients understand the result of their request. For example, "Request successful", "Validation failed: Missing required fields", "An unexpected error occurred", etc.
        /// </summary>
        public string Message { get; set; } = string.Empty;

        /// <summary>
        /// Data payload of the API response. This is a generic property that can hold any type of data relevant to the API response. For successful responses, this would typically contain the requested data or the result of an operation. For error responses, this could be null or contain additional error details if necessary. The use of a generic type allows for flexibility in the kind of data that can be returned while maintaining a consistent response structure across the application.
        /// </summary>
        public T? Data { get; set; }

        /// <summary>
        /// Errors is a list of error messages that provide detailed information about any issues that occurred during the processing of the API request. This property is particularly useful for conveying validation errors, exceptions, or any other problems that prevented the successful completion of the request. For example, if a client submits a request with missing required fields, the Errors list could contain messages like "The 'name' field is required" or "The 'email' field must be a valid email address". This allows clients to easily identify and address issues with their requests based on the feedback provided in the response.
        /// </summary>
        public List<string> Errors { get; set; } = new List<string>();

        /// <summary>
        /// Timestamp indicating when the API response was generated. This can be useful for clients to track the timing of responses, especially in scenarios where multiple requests are made in quick succession or when debugging issues related to response times. The timestamp is typically set to the current date and time when the response is created, providing a reference point for when the API processed the request and generated the response.
        /// </summary>
        public DateTime TimeStamp { get; set; } = DateTime.Now;

        /// <summary>
        /// Success response factory method. This method creates a standardized API response for successful requests. It takes the data to be returned and an optional message parameter, which defaults to "Request successful". The method sets the IsSuccess property to true, the StatusCode to HttpStatusCode.OK (200), and populates the Data and Message properties accordingly. This allows for a consistent structure for successful API responses across the application, making it easier for clients to handle and interpret the results of their requests.
        /// </summary>
        /// <param name="data"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        public static ApiResponse<T> Success(T data, string message = "Request successful")
        {
            return new ApiResponse<T>
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Message = message,
                Data = data,
                TimeStamp = DateTime.Now
            };
        }

        /// <summary>
        /// Created response factory method. This method creates a standardized API response for successful resource creation. It takes the data of the created resource and an optional message parameter, which defaults to "Resource created successfully". The method sets the IsSuccess property to true, the StatusCode to HttpStatusCode.Created (201), and populates the Data and Message properties accordingly. This provides a consistent structure for responses related to resource creation across the application, allowing clients to easily recognize when a new resource has been successfully created and access the relevant data.
        /// </summary>
        /// <param name="data"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        public static ApiResponse<T> Created(T data, string message = "Resource created successfully")
        {
            return new ApiResponse<T>
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.Created,
                Message = message,
                Data = data,
                TimeStamp = DateTime.Now
            };
        }

        /// <summary>
        /// Failure response factory method. This method creates a standardized API response for failed requests. It takes a message describing the failure, an optional status code (defaulting to HttpStatusCode.BadRequest), and an optional list of error messages providing additional details about the failure. The method sets the IsSuccess property to false, populates the StatusCode and Message properties based on the provided parameters, and initializes the Errors property with the provided error messages or an empty list if none are provided. This allows for a consistent structure for error responses across the application, making it easier for clients to understand and handle errors based on the feedback provided in the response.
        /// </summary>
        /// <param name="message"></param>
        /// <param name="status"></param>
        /// <param name="errors"></param>
        /// <returns></returns>
        public static ApiResponse<T> Fail(string message, HttpStatusCode status = HttpStatusCode.BadRequest, List<string>? errors = null)
        {
            return new ApiResponse<T>
            {
                IsSuccess = false,
                StatusCode = status,
                Message = message,
                Errors = errors ?? [],
                TimeStamp = DateTime.Now
            };
        }

        /// <summary>
        /// Exception response factory method. This method creates a standardized API response for unexpected exceptions that occur during the processing of an API request. It takes an Exception object as a parameter and constructs a response indicating that an error occurred. The method sets the IsSuccess property to false, the StatusCode to HttpStatusCode.InternalServerError (500), and populates the Message property with a generic error message ("An unexpected error occurred."). Additionally, it populates the Errors property with the exception's message and stack trace to provide detailed information about the error for debugging purposes. This allows for a consistent structure for error responses related to exceptions across the application, making it easier for clients to understand when an unexpected error has occurred and providing developers with valuable information for troubleshooting.
        /// </summary>
        /// <param name="ex"></param>
        /// <returns></returns>
        public static ApiResponse<T> Exception(Exception ex)
        {
            return new ApiResponse<T>
            {
                IsSuccess = false,
                StatusCode = HttpStatusCode.InternalServerError,
                Message = "An unexpected error occurred.",
                Errors = new List<string> { ex.Message, ex.StackTrace ?? "" },
                TimeStamp = DateTime.Now
            };
        }
    }
}
