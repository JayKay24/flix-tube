provider "azurerm" {
  features {}
  subscription_id = var.flixtube_az_subscription_id
  resource_provider_registrations = "none"
}

module "common" {
  source                              = "../modules/common"
  flixtube_az_container_registry_name = var.flixtube_az_container_registry_name
  flixtube_az_region_name             = var.flixtube_az_region_name
  flixtube_az_resource_group_name     = var.flixtube_az_resource_group_name
}

module "production" {
  source                          = "../modules/production"
  flixtube_az_region_name         = var.flixtube_az_region_name
  flixtube_az_subscription_id     = var.flixtube_az_subscription_id
  flixtube_az_resource_group_name = var.flixtube_az_resource_group_name
  flixtube_aks_app_name           = var.flixtube_aks_app_name
  flixtube_kubernetes_version     = var.flixtube_kubernetes_version
  flixtube_cosmosdb_account_name  = var.flixtube_cosmosdb_account_name
  container_registry_id           = module.common.container_registry_id
}
