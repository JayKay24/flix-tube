provider "azurerm" {
  features {}
  subscription_id = var.flixtube_az_subscription_id
  resource_provider_registrations = "none"
}

module "common" {
  source = "../modules/common"
  flixtube_az_container_registry_name = var.flixtube_az_container_registry_name
  flixtube_az_region_name = var.flixtube_az_region_name
  flixtube_az_resource_group_name = var.flixtube_az_resource_group_name
}
