module "common" {
  source = "../modules/common"
  flixtube_az_container_registry_name = var.flixtube_az_container_registry_name
  flixtube_az_region_name = var.flixtube_az_region_name
  flixtube_az_resource_group_name = var.flixtube_az_resource_group_name
}

module "production" {
  source = "../modules/web_app"
  flixtube_az_region_name = var.flixtube_az_region_name
  flixtube_az_subscription_id = var.flixtube_az_subscription_id
  flixtube_az_resource_group_name = var.flixtube_az_resource_group_name
  flixtube_aks_app_name = var.flixtube_aks_app_name
  flixtube_kubernetes_version = var.flixtube_kubernetes_version
  flixtube_cosmosdb_account_name = var.flixtube_cosmosdb_account_name
}
