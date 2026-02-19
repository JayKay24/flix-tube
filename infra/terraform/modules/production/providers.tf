terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
      version = "4.58.0"
    }
  }
}

provider "azurerm" {
  features {}

  subscription_id = var.flixtube_az_subscription_id
  resource_provider_registrations = "none"
}
