{
  "openapi": "3.0.1",
  "info": {
    "title": "Todo API",
    "version": "v1"
  },
  "paths": {
    "/api/v1/admin/vocabularies/import": {
      "post": {
        "tags": [
          "AdminVocabularies"
        ],
        "parameters": [
          {
            "name": "categoryId",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "requestBody": {
          "content": {
            "multipart/form-data": {
              "schema": {
                "type": "object",
                "properties": {
                  "excelFile": {
                    "type": "string",
                    "format": "binary"
                  },
                  "mediaZip": {
                    "type": "string",
                    "format": "binary"
                  }
                }
              },
              "encoding": {
                "excelFile": {
                  "style": "form"
                },
                "mediaZip": {
                  "style": "form"
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/admin/vocabularies/import-status/{jobId}": {
      "get": {
        "tags": [
          "AdminVocabularies"
        ],
        "parameters": [
          {
            "name": "jobId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/auth/register": {
      "post": {
        "tags": [
          "Auth"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RegisterCommand"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/RegisterCommand"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/RegisterCommand"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/auth/login": {
      "post": {
        "tags": [
          "Auth"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/LoginCommand"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/LoginCommand"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/LoginCommand"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/auth/logout": {
      "post": {
        "tags": [
          "Auth"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/LogoutRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/LogoutRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/LogoutRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/dictionary/search": {
      "get": {
        "tags": [
          "Dictionary"
        ],
        "parameters": [
          {
            "name": "query",
            "in": "query",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/VocabularyListApiResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/VocabularyListApiResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/VocabularyListApiResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/learning/catalog": {
      "get": {
        "tags": [
          "Learning"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/learning/lessons/{id}/vocabularies": {
      "get": {
        "tags": [
          "Learning"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/profile/analytics": {
      "get": {
        "tags": [
          "Profile"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/profile/vocabulary-mastery": {
      "get": {
        "tags": [
          "Profile"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/study-progress/lessons": {
      "post": {
        "tags": [
          "StudyProgress"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SaveUserProgressCommand"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SaveUserProgressCommand"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SaveUserProgressCommand"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/study-progress/vocabularies": {
      "post": {
        "tags": [
          "StudyProgress"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateWordProgressCommand"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateWordProgressCommand"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateWordProgressCommand"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "AddressFamily": {
        "enum": [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          21,
          22,
          23,
          24,
          25,
          26,
          28,
          29,
          65536,
          65537,
          -1
        ],
        "type": "integer",
        "format": "int32"
      },
      "ChallengeWord": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "lessonId": {
            "type": "string",
            "format": "uuid"
          },
          "sortOrder": {
            "type": "integer",
            "format": "int32"
          },
          "hanzi": {
            "type": "string",
            "nullable": true
          },
          "pinyin": {
            "type": "string",
            "nullable": true
          },
          "meaningVn": {
            "type": "string",
            "nullable": true
          },
          "exampleZh": {
            "type": "string",
            "nullable": true
          },
          "exampleVn": {
            "type": "string",
            "nullable": true
          },
          "lesson": {
            "$ref": "#/components/schemas/Lesson"
          }
        },
        "additionalProperties": false
      },
      "Document": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "categoryId": {
            "type": "integer",
            "format": "int32"
          },
          "title": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "downloadUrl": {
            "type": "string",
            "nullable": true
          },
          "docType": {
            "type": "string",
            "nullable": true
          },
          "sortOrder": {
            "type": "integer",
            "format": "int32"
          },
          "isPublished": {
            "type": "boolean"
          },
          "createdAt": {
            "type": "string",
            "format": "date-time"
          },
          "category": {
            "$ref": "#/components/schemas/LessonCategory"
          }
        },
        "additionalProperties": false
      },
      "HanziCard": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "lessonId": {
            "type": "string",
            "format": "uuid"
          },
          "sortOrder": {
            "type": "integer",
            "format": "int32"
          },
          "character": {
            "type": "string",
            "nullable": true
          },
          "pinyin": {
            "type": "string",
            "nullable": true
          },
          "meaning": {
            "type": "string",
            "nullable": true
          },
          "mnemonic": {
            "type": "string",
            "nullable": true
          },
          "strokeCount": {
            "type": "integer",
            "format": "int32",
            "nullable": true
          },
          "radical": {
            "type": "string",
            "nullable": true
          },
          "lesson": {
            "$ref": "#/components/schemas/Lesson"
          }
        },
        "additionalProperties": false
      },
      "IPAddress": {
        "type": "object",
        "properties": {
          "addressFamily": {
            "$ref": "#/components/schemas/AddressFamily"
          },
          "scopeId": {
            "type": "integer",
            "format": "int64"
          },
          "isIPv6Multicast": {
            "type": "boolean",
            "readOnly": true
          },
          "isIPv6LinkLocal": {
            "type": "boolean",
            "readOnly": true
          },
          "isIPv6SiteLocal": {
            "type": "boolean",
            "readOnly": true
          },
          "isIPv6Teredo": {
            "type": "boolean",
            "readOnly": true
          },
          "isIPv6UniqueLocal": {
            "type": "boolean",
            "readOnly": true
          },
          "isIPv4MappedToIPv6": {
            "type": "boolean",
            "readOnly": true
          },
          "address": {
            "type": "integer",
            "format": "int64",
            "deprecated": true
          }
        },
        "additionalProperties": false
      },
      "ImportJob": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "uploadedBy": {
            "type": "string",
            "format": "uuid"
          },
          "fileName": {
            "type": "string",
            "nullable": true
          },
          "status": {
            "type": "string",
            "nullable": true
          },
          "totalRows": {
            "type": "integer",
            "format": "int32"
          },
          "processedRows": {
            "type": "integer",
            "format": "int32"
          },
          "failedRows": {
            "type": "integer",
            "format": "int32"
          },
          "errorLog": {
            "type": "string",
            "nullable": true
          },
          "categoryId": {
            "type": "integer",
            "format": "int32",
            "nullable": true
          },
          "startedAt": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "finishedAt": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "createdAt": {
            "type": "string",
            "format": "date-time"
          },
          "category": {
            "$ref": "#/components/schemas/LessonCategory"
          },
          "uploadedByNavigation": {
            "$ref": "#/components/schemas/User"
          }
        },
        "additionalProperties": false
      },
      "Lesson": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "categoryId": {
            "type": "integer",
            "format": "int32"
          },
          "lessonNumber": {
            "type": "integer",
            "format": "int32",
            "nullable": true
          },
          "filename": {
            "type": "string",
            "nullable": true
          },
          "titleCn": {
            "type": "string",
            "nullable": true
          },
          "titleVn": {
            "type": "string",
            "nullable": true
          },
          "icon": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "badge": {
            "type": "string",
            "nullable": true
          },
          "isPublished": {
            "type": "boolean"
          },
          "sortOrder": {
            "type": "integer",
            "format": "int32"
          },
          "createdAt": {
            "type": "string",
            "format": "date-time"
          },
          "updatedAt": {
            "type": "string",
            "format": "date-time"
          },
          "category": {
            "$ref": "#/components/schemas/LessonCategory"
          },
          "challengeWords": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ChallengeWord"
            },
            "nullable": true
          },
          "hanziCards": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/HanziCard"
            },
            "nullable": true
          },
          "quizQuestions": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/QuizQuestion"
            },
            "nullable": true
          },
          "radicalSets": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/RadicalSet"
            },
            "nullable": true
          },
          "userProgresses": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/UserProgress"
            },
            "nullable": true
          },
          "vocabularies": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Vocabulary"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "LessonCategory": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int32"
          },
          "slug": {
            "type": "string",
            "nullable": true
          },
          "name": {
            "type": "string",
            "nullable": true
          },
          "sortOrder": {
            "type": "integer",
            "format": "int32"
          },
          "documents": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Document"
            },
            "nullable": true
          },
          "importJobs": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ImportJob"
            },
            "nullable": true
          },
          "lessons": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Lesson"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "LoginCommand": {
        "type": "object",
        "properties": {
          "email": {
            "type": "string",
            "nullable": true
          },
          "userName": {
            "type": "string",
            "nullable": true
          },
          "password": {
            "type": "string",
            "nullable": true
          },
          "ipAddress": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "LogoutRequest": {
        "type": "object",
        "properties": {
          "clientRefreshToken": {
            "type": "string",
            "nullable": true
          },
          "logoutAllDevices": {
            "type": "boolean"
          }
        },
        "additionalProperties": false
      },
      "MediaFile": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "ownerType": {
            "type": "string",
            "nullable": true
          },
          "ownerId": {
            "type": "string",
            "format": "uuid"
          },
          "mediaType": {
            "type": "string",
            "nullable": true
          },
          "fileName": {
            "type": "string",
            "nullable": true
          },
          "storageKey": {
            "type": "string",
            "nullable": true
          },
          "cdnUrl": {
            "type": "string",
            "nullable": true
          },
          "mimeType": {
            "type": "string",
            "nullable": true
          },
          "fileSizeKb": {
            "type": "integer",
            "format": "int32",
            "nullable": true
          },
          "uploadedBy": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "createdAt": {
            "type": "string",
            "format": "date-time"
          },
          "uploadedByNavigation": {
            "$ref": "#/components/schemas/User"
          }
        },
        "additionalProperties": false
      },
      "Permission": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int32"
          },
          "code": {
            "type": "string",
            "nullable": true
          },
          "name": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "roles": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Role"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "QuizOption": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "questionId": {
            "type": "string",
            "format": "uuid"
          },
          "sortOrder": {
            "type": "integer",
            "format": "int32"
          },
          "optionText": {
            "type": "string",
            "nullable": true
          },
          "isCorrect": {
            "type": "boolean"
          },
          "question": {
            "$ref": "#/components/schemas/QuizQuestion"
          }
        },
        "additionalProperties": false
      },
      "QuizQuestion": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "lessonId": {
            "type": "string",
            "format": "uuid"
          },
          "sortOrder": {
            "type": "integer",
            "format": "int32"
          },
          "question": {
            "type": "string",
            "nullable": true
          },
          "explanation": {
            "type": "string",
            "nullable": true
          },
          "difficulty": {
            "type": "integer",
            "format": "int32"
          },
          "lesson": {
            "$ref": "#/components/schemas/Lesson"
          },
          "quizOptions": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/QuizOption"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "Radical": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "setId": {
            "type": "string",
            "format": "uuid"
          },
          "sortOrder": {
            "type": "integer",
            "format": "int32"
          },
          "radical1": {
            "type": "string",
            "nullable": true
          },
          "name": {
            "type": "string",
            "nullable": true
          },
          "meaning": {
            "type": "string",
            "nullable": true
          },
          "exampleChars": {
            "type": "string",
            "nullable": true
          },
          "set": {
            "$ref": "#/components/schemas/RadicalSet"
          }
        },
        "additionalProperties": false
      },
      "RadicalSet": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "setNumber": {
            "type": "integer",
            "format": "int32"
          },
          "title": {
            "type": "string",
            "nullable": true
          },
          "icon": {
            "type": "string",
            "nullable": true
          },
          "lessonId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "lesson": {
            "$ref": "#/components/schemas/Lesson"
          },
          "radicals": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Radical"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "RegisterCommand": {
        "type": "object",
        "properties": {
          "username": {
            "type": "string",
            "nullable": true
          },
          "password": {
            "type": "string",
            "nullable": true
          },
          "confirmPassword": {
            "type": "string",
            "nullable": true
          },
          "displayName": {
            "type": "string",
            "nullable": true
          },
          "email": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "Role": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int32"
          },
          "code": {
            "type": "string",
            "nullable": true
          },
          "name": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "userRoles": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/UserRole"
            },
            "nullable": true
          },
          "permissions": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Permission"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SaveUserProgressCommand": {
        "type": "object",
        "properties": {
          "userId": {
            "type": "string",
            "format": "uuid"
          },
          "lessonId": {
            "type": "string",
            "format": "uuid"
          },
          "score": {
            "type": "integer",
            "format": "int32"
          },
          "completed": {
            "type": "boolean"
          },
          "timeSpentS": {
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
      },
      "SearchHistory": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "userId": {
            "type": "string",
            "format": "uuid"
          },
          "query": {
            "type": "string",
            "nullable": true
          },
          "vocabId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "searchedAt": {
            "type": "string",
            "format": "date-time"
          },
          "user": {
            "$ref": "#/components/schemas/User"
          },
          "vocab": {
            "$ref": "#/components/schemas/Vocabulary"
          }
        },
        "additionalProperties": false
      },
      "UpdateWordProgressCommand": {
        "type": "object",
        "properties": {
          "userId": {
            "type": "string",
            "format": "uuid"
          },
          "vocabId": {
            "type": "string",
            "format": "uuid"
          },
          "status": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "User": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "username": {
            "type": "string",
            "nullable": true
          },
          "passwordHash": {
            "type": "string",
            "nullable": true
          },
          "displayName": {
            "type": "string",
            "nullable": true
          },
          "email": {
            "type": "string",
            "nullable": true
          },
          "isActive": {
            "type": "boolean"
          },
          "createdAt": {
            "type": "string",
            "format": "date-time"
          },
          "lastLoginAt": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "importJobs": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ImportJob"
            },
            "nullable": true
          },
          "mediaFiles": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/MediaFile"
            },
            "nullable": true
          },
          "searchHistories": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SearchHistory"
            },
            "nullable": true
          },
          "userProgresses": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/UserProgress"
            },
            "nullable": true
          },
          "userRoles": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/UserRole"
            },
            "nullable": true
          },
          "userSessions": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/UserSession"
            },
            "nullable": true
          },
          "userWordProgresses": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/UserWordProgress"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "UserProgress": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "userId": {
            "type": "string",
            "format": "uuid"
          },
          "lessonId": {
            "type": "string",
            "format": "uuid"
          },
          "score": {
            "type": "integer",
            "format": "int32"
          },
          "completed": {
            "type": "boolean"
          },
          "attempts": {
            "type": "integer",
            "format": "int32"
          },
          "timeSpentS": {
            "type": "integer",
            "format": "int32"
          },
          "lastPlayed": {
            "type": "string",
            "format": "date-time"
          },
          "createdAt": {
            "type": "string",
            "format": "date-time"
          },
          "lesson": {
            "$ref": "#/components/schemas/Lesson"
          },
          "user": {
            "$ref": "#/components/schemas/User"
          }
        },
        "additionalProperties": false
      },
      "UserRole": {
        "type": "object",
        "properties": {
          "userId": {
            "type": "string",
            "format": "uuid"
          },
          "roleId": {
            "type": "integer",
            "format": "int32"
          },
          "createdAt": {
            "type": "string",
            "format": "date-time"
          },
          "role": {
            "$ref": "#/components/schemas/Role"
          },
          "user": {
            "$ref": "#/components/schemas/User"
          }
        },
        "additionalProperties": false
      },
      "UserSession": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "userId": {
            "type": "string",
            "format": "uuid"
          },
          "refreshToken": {
            "type": "string",
            "nullable": true
          },
          "ipAddress": {
            "$ref": "#/components/schemas/IPAddress"
          },
          "userAgent": {
            "type": "string",
            "nullable": true
          },
          "expiresAt": {
            "type": "string",
            "format": "date-time"
          },
          "createdAt": {
            "type": "string",
            "format": "date-time"
          },
          "user": {
            "$ref": "#/components/schemas/User"
          }
        },
        "additionalProperties": false
      },
      "UserWordProgress": {
        "type": "object",
        "properties": {
          "userId": {
            "type": "string",
            "format": "uuid"
          },
          "vocabId": {
            "type": "string",
            "format": "uuid"
          },
          "status": {
            "type": "string",
            "nullable": true
          },
          "reviewCount": {
            "type": "integer",
            "format": "int32"
          },
          "lastReviewed": {
            "type": "string",
            "format": "date-time"
          },
          "user": {
            "$ref": "#/components/schemas/User"
          },
          "vocab": {
            "$ref": "#/components/schemas/Vocabulary"
          }
        },
        "additionalProperties": false
      },
      "Vocabulary": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "lessonId": {
            "type": "string",
            "format": "uuid"
          },
          "sortOrder": {
            "type": "integer",
            "format": "int32"
          },
          "word": {
            "type": "string",
            "nullable": true
          },
          "pinyin": {
            "type": "string",
            "nullable": true
          },
          "meaning": {
            "type": "string",
            "nullable": true
          },
          "meaningEn": {
            "type": "string",
            "nullable": true
          },
          "audioUrl": {
            "type": "string",
            "nullable": true
          },
          "imageUrl": {
            "type": "string",
            "nullable": true
          },
          "exampleCn": {
            "type": "string",
            "nullable": true
          },
          "examplePy": {
            "type": "string",
            "nullable": true
          },
          "exampleVn": {
            "type": "string",
            "nullable": true
          },
          "lesson": {
            "$ref": "#/components/schemas/Lesson"
          },
          "searchHistories": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SearchHistory"
            },
            "nullable": true
          },
          "userWordProgresses": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/UserWordProgress"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "VocabularyListApiResponse": {
        "type": "object",
        "properties": {
          "isSuccess": {
            "type": "boolean"
          },
          "statusCode": {
            "type": "integer",
            "format": "int32"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Vocabulary"
            },
            "nullable": true
          },
          "errors": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      }
    },
    "securitySchemes": {
      "Bearer": {
        "type": "apiKey",
        "description": "Nh?p 'Bearer [kho?ng tr?ng] [token c?a b?n]'.",
        "name": "Authorization",
        "in": "header"
      }
    }
  },
  "security": [
    {
      "Bearer": [ ]
    }
  ]
}