const modelMap = {
  "claude-3-7-sonnet-20250219": {
    "provider": "anthropic",
    "name": "claude-3-7-sonnet-latest",
    "model_config_display_name": null,
    "parameters": {
      "max_tokens": 64000,
      "temperature": 1,
      "top_k": 0,
      "top_p": 0
    }
  },
  "claude-3-7-sonnet-20250219-thinking": {
    "provider": "anthropic",
    "name": "claude-3-7-sonnet-latest",
    "model_config_display_name": null,
    "parameters": {
      "max_tokens": 64000,
      "thinking": {
        "type": "enabled",
        "budget_tokens": 32000
      }
    }
  },
  "claude-sonnet-4-20250514": {
    "provider": "anthropic",
    "name": "claude-sonnet-4-20250514",
    "model_config_display_name": null,
    "parameters": {
      "max_tokens": 64000,
      "temperature": 1,
      "top_k": 0,
      "top_p": 0
    }
  },
  "claude-sonnet-4-20250514-thinking": {
    "provider": "anthropic",
    "name": "claude-sonnet-4-20250514",
    "model_config_display_name": null,
    "parameters": {
      "max_tokens": 64000,
      "thinking": {
        "type": "enabled",
        "budget_tokens": 32000
      }
    }
  },
  "claude-opus-4-20250514": {
    "provider": "anthropic",
    "name": "claude-opus-4-20250514",
    "model_config_display_name": null,
    "parameters": {
      "max_tokens": 32000,
      "temperature": 1,
      "top_k": 0,
      "top_p": 0
    }
  },
  "claude-opus-4-20250514-thinking": {
    "provider": "anthropic",
    "name": "claude-opus-4-20250514",
    "model_config_display_name": null,
    "parameters": {
      "max_tokens": 32000,
      "thinking": {
        "type": "enabled",
        "budget_tokens": 16000
      }
    }
  },
  "o4-mini": {
    "provider": "openai",
    "name": "o4-mini",
    "model_config_display_name": null,
    "parameters": {
      "response_format": {
        "type": "text"
      },
      "reasoning_effort": "high",
      "max_completion_tokens": 100000
    }
  },
  "chatgpt-4o-latest": {
    "provider": "openai",
    "name": "chatgpt-4o-latest",
    "model_config_display_name": null,
    "parameters": {
      "temperature": 1,
      "seed": 0,
      "response_format": null,
      "top_p": 1,
      "frequency_penalty": 0,
      "presence_penalty": 0
    }
  },
  "gpt-4.1": {
    "provider": "openai",
    "name": "gpt-4.1",
    "model_config_display_name": null,
    "parameters": {
      "temperature": 1,
      "seed": 0,
      "response_format": null,
      "top_p": 1
    }
  },
  "gpt-4.1-mini": {
    "provider": "openai",
    "name": "gpt-4.1-mini",
    "model_config_display_name": null,
    "parameters": {
      "temperature": 1,
      "seed": 0,
      "response_format": null,
      "top_p": 1
    }
  },
  "gpt-4.1-nano": {
    "provider": "openai",
    "name": "gpt-4.1-nano",
    "model_config_display_name": null,
    "parameters": {
      "temperature": 1,
      "seed": 0,
      "response_format": null,
      "top_p": 1
    }
  },
  "gpt-4.5-preview": {
    "provider": "openai",
    "name": "gpt-4.5-preview",
    "model_config_display_name": null,
    "parameters": {
      "temperature": 1,
      "seed": 0,
      "response_format": null,
      "top_p": 1,
      "frequency_penalty": 0,
      "presence_penalty": 0
    }
  },
  "o3": {
    "provider": "openai",
    "name": "o3",
    "model_config_display_name": null,
    "parameters": {
      "response_format": {
        "type": "text"
      },
      "reasoning_effort": "high",
      "max_completion_tokens": 100000
    }
  },
  "gpt-4o-search-preview": {
    "provider": "openai",
    "name": "gpt-4o-search-preview",
    "model_config_display_name": null,
    "parameters": {
      "response_format": null,
      "web_search_options": {
        "search_context_size": "high",
        "user_location": {
          "approximate": {
            "city": "New York",
            "country": "US",
            "region": "New York",
            "timezone": "America/New_York"
          },
          "type": "approximate"
        }
      }
    }
  },
  "gpt-4o-mini-search-preview": {
    "provider": "openai",
    "name": "gpt-4o-mini-search-preview",
    "model_config_display_name": null,
    "parameters": {
      "response_format": null,
      "web_search_options": {
        "search_context_size": "medium",
        "user_location": {
          "approximate": {
            "city": "New York",
            "country": "US",
            "region": "New York",
            "timezone": "America/New_York"
          },
          "type": "approximate"
        }
      }
    }
  },
  "gpt-4o": {
    "provider": "openai",
    "name": "gpt-4o-2024-11-20",
    "model_config_display_name": null,
    "parameters": {
      "temperature": 1,
      "seed": 0,
      "response_format": null,
      "top_p": 1,
      "frequency_penalty": 0,
      "presence_penalty": 0
    }
  },
  "gpt-4o-mini": {
    "provider": "openai",
    "name": "gpt-4o-mini",
    "model_config_display_name": null,
    "parameters": {
      "temperature": 1,
      "seed": 0,
      "response_format": null,
      "top_p": 1,
      "frequency_penalty": 0,
      "presence_penalty": 0
    }
  },
  "o3-mini": {
    "provider": "openai",
    "name": "o3-mini",
    "model_config_display_name": null,
    "parameters": {
      "response_format": {
        "type": "text"
      },
      "reasoning_effort": "high",
      "max_completion_tokens": 100000
    }
  }

}

module.exports = modelMap
